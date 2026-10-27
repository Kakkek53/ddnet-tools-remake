/** DDNet DATA v4 writer. Layout follows src/engine/shared/datafile.cpp and
 * src/game/mapitems.h in https://github.com/ddnet/ddnet (see README). */
export function ints(values) {
    const out = new Uint8Array(values.length * 4);
    const view = new DataView(out.buffer);
    values.forEach((value, i) => view.setInt32(i * 4, value, true));
    return out;
}
export function packedName(text, count) {
    const bytes = new TextEncoder().encode(text);
    const result = [];
    for (let i = 0; i < count; i++) {
        let value = 0;
        for (let c = 0; c < 4; c++) {
            const offset = i * 4 + c;
            const byte = offset < count * 4 - 1 ? (bytes[offset] || 0) : 0;
            value = (value << 8) | ((byte + 128) & 255);
        }
        result.push(value | 0);
    }
    result[count - 1] &= 0xffffff00;
    return result;
}
export function checkAbort(signal) {
    if (signal?.aborted) throw new DOMException('Conversion cancelled.', 'AbortError');
}
export class DataFile {
    constructor(signal) { this.items = []; this.data = []; this.signal = signal; }
    item(type, id, values) { this.items.push({ type, id, bytes: ints(values) }); }
    async raw(bytes) {
        checkAbort(this.signal);
        const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'));
        const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
        checkAbort(this.signal);
        this.data.push({ bytes: compressed, size: bytes.byteLength });
        return this.data.length - 1;
    }
    async string(text) { return this.raw(new TextEncoder().encode(text + '\0')); }
    finish() {
        checkAbort(this.signal);
        this.items.sort((a, b) => a.type - b.type || a.id - b.id);
        const types = [];
        this.items.forEach((item, i) => {
            const previous = types[types.length - 1];
            if (previous?.[0] === item.type) previous[2]++;
            else types.push([item.type, i, 1]);
        });
        let itemSize = 0, dataSize = 0;
        const itemOffsets = this.items.map(item => { const n = itemSize; itemSize += 8 + item.bytes.length; return n; });
        const dataOffsets = this.data.map(data => { const n = dataSize; dataSize += data.bytes.length; return n; });
        const swapSize = 36 + types.length * 12 + this.items.length * 4 + this.data.length * 8 + itemSize;
        if (swapSize + dataSize > 0x7fffffff) throw new Error('The map exceeds the DATA format size limit.');
        return new Blob([
            new TextEncoder().encode('DATA'),
            ints([4, swapSize + dataSize - 16, swapSize - 16, types.length, this.items.length, this.data.length, itemSize, dataSize]),
            ints(types.flat()), ints(itemOffsets), ints(dataOffsets), ints(this.data.map(d => d.size)),
            ...this.items.flatMap(item => [ints([(item.type << 16) | item.id, item.bytes.length]), item.bytes]),
            ...this.data.map(d => d.bytes)
        ], { type: 'application/octet-stream' });
    }
}
const powerOfTwo = n => 2 ** Math.ceil(Math.log2(n));
export function planMedia(sourceWidth, sourceHeight, maxEdge, duration, fps) {
    if (![sourceWidth, sourceHeight, maxEdge, duration, fps].every(Number.isFinite) || sourceWidth <= 0 || sourceHeight <= 0 || duration <= 0 || duration > 600 || fps < 1 || fps > 60 || maxEdge < 64 || maxEdge > 4096) {
        throw new Error('Use a valid source, 1–60 FPS, a 64–4096 px resolution, and a clip up to 600 seconds.');
    }
    const scale = Math.min(1, maxEdge / Math.max(sourceWidth, sourceHeight));
    const width = scale === 1 ? sourceWidth : Math.max(2, Math.round(sourceWidth * scale / 2) * 2);
    const height = scale === 1 ? sourceHeight : Math.max(2, Math.round(sourceHeight * scale / 2) * 2);
    const totalMs = Math.max(1, Math.round(duration * 1000));
    let count = Math.max(1, Math.ceil(duration * fps - 1e-7));
    // Millisecond envelope timestamps cannot represent a zero-length last frame.
    while (count > 1 && Math.round((count - 1) * 1000 / fps) >= totalMs) count--;
    if (count > 600) throw new Error(`${count} frames requested. Use at most 600 frames: reduce FPS or shorten the clip.`);
    // Full-resolution frames use dedicated, exact-size textures. Padding a 1920×1080
    // frame to a power-of-two atlas wastes memory and can soften its UV sampling.
    const dedicated = Math.max(width, height) > 1024;
    const padding = dedicated ? 0 : 2;
    const cellWidth = width + padding * 2, cellHeight = height + padding * 2;
    const columns = dedicated ? 1 : Math.min(count, Math.floor(2048 / cellWidth));
    const rows = dedicated ? 1 : Math.floor(2048 / cellHeight);
    const perPage = columns * rows;
    const pages = [];
    for (let first = 0; first < count; first += perPage) {
        const frames = Math.min(perPage, count - first);
        pages.push({ first, frames, columns: Math.min(columns, frames), padding,
            width: dedicated ? width : powerOfTwo(Math.min(columns, frames) * cellWidth),
            height: dedicated ? height : powerOfTwo(Math.ceil(frames / columns) * cellHeight) });
    }
    const textureBytes = pages.reduce((sum, page) => sum + page.width * page.height * 4, 0);
    if (pages.length > 64 || textureBytes > 512 * 1024 * 1024) throw new Error('This clip needs too much texture memory. Lower the resolution, FPS, or duration (512 MiB / 64 textures maximum).');
    if (count > totalMs) throw new Error('The clip is too short for this frame rate.');
    return { width, height, count, fps, duration, totalMs, pages, textureBytes };
}
/** Each quad uses a four-channel STEP color envelope. Every envelope ends at
 * the same time, so DDNet's modulo evaluation loops the complete sequence. */
export function frameEnvelope(index, plan) {
    const start = Math.round(index * 1000 / plan.fps);
    const end = Math.min(plan.totalMs, Math.round((index + 1) * 1000 / plan.fps));
    const points = [[0, index === 0 ? 1024 : 0]];
    if (start > 0) points.push([start, 1024]);
    if (end < plan.totalMs) points.push([end, 0]);
    points.push([plan.totalMs, index === 0 ? 1024 : 0]);
    return points.flatMap(([time, alpha]) => [time, 0, 1024, 1024, 1024, alpha]);
}
function quad(x, y, width, height, uv, env = -1, color = [255, 255, 255, 255]) {
    const fx = n => Math.round(n * 1024);
    return [x, y, x + width, y, x, y + height, x + width, y + height, x + width / 2, y + height / 2].map(fx)
        .concat(Array(4).fill(color).flat(), uv.map(fx), [-1, 0, env, 0]);
}
function group(writer, id, first, count, name, parallax = 100) {
    writer.item(4, id, [3, 0, 0, parallax, parallax, first, count, 0, 0, 0, 0, 0, ...packedName(name, 3)]);
}
export class MediaMap {
    constructor(plan, animated, signal, options = {}) {
        this.plan = plan; this.animated = animated; this.writer = new DataFile(signal);
        this.points = []; this.nextPage = 0;
        this.background = options.placement !== 'object';
        // The background uses a centered 1664×1280 background with 0/0 parallax.
        // DDNet's normal viewport is capped at 1500×1050 world units. Cover the
        // reference bounds, preserving the media aspect ratio rather than stretching.
        const scale = this.background ? Math.max(1664 / plan.width, 1280 / plan.height) : 1024 / Math.max(plan.width, plan.height);
        this.worldWidth = plan.width * scale; this.worldHeight = plan.height * scale;
        this.worldX = this.background ? -this.worldWidth / 2 : 128;
        this.worldY = this.background ? -this.worldHeight / 2 : 96;
        this.writer.item(0, 0, [1]);
    }
    async addAtlas(page, rgba) {
        const { plan, writer } = this;
        if (page !== plan.pages[this.nextPage] || rgba.length !== page.width * page.height * 4) throw new Error('Invalid atlas order or pixel data.');
        const image = this.nextPage++;
        const name = await writer.string(`media_${image}`);
        const pixels = await writer.raw(rgba);
        writer.item(2, image, [1, page.width, page.height, 0, name, pixels]);
        const quads = [];
        for (let local = 0; local < page.frames; local++) {
            const index = page.first + local;
            const x = (local % page.columns) * (plan.width + page.padding * 2) + page.padding;
            const y = Math.floor(local / page.columns) * (plan.height + page.padding * 2) + page.padding;
            const u0 = x / page.width, v0 = y / page.height;
            const u1 = (x + plan.width) / page.width, v1 = (y + plan.height) / page.height;
            quads.push(...quad(this.worldX, this.worldY, this.worldWidth, this.worldHeight, [u0, v0, u1, v0, u0, v1, u1, v1], this.animated ? index : -1));
            if (this.animated) {
                const points = frameEnvelope(index, plan);
                writer.item(3, index, [2, 4, this.points.length / 6, points.length / 6, ...packedName(`Frame ${index + 1}`, 8), 1]);
                this.points.push(...points);
            }
        }
        const data = await writer.raw(ints(quads));
        writer.item(5, image, [0, 3, 0, 2, page.frames, data, image, ...packedName('Media', 3)]);
    }
    async finish() {
        const { writer, plan } = this;
        if (this.nextPage !== plan.pages.length) throw new Error('Some animation frames are missing.');
        const author = await writer.string('DDNet Tools Remake');
        const version = await writer.string('1');
        const credits = await writer.string(this.animated ? `Media to map: ${plan.count} frames at ${plan.fps} FPS, loop ${plan.totalMs} ms` : 'Image to map');
        writer.item(1, 0, [1, author, version, credits, -1]);
        const floorY = this.background ? 21 : Math.ceil((96 + this.worldHeight) / 32) + 2;
        const width = this.background ? 40 : Math.ceil((256 + this.worldWidth) / 32), height = floorY + 3;
        // A background must contain only the media, with no visible demo platform.
        // The old gray quad was drawn over the full-screen image and looked like a gap.
        const mediaLayers = plan.pages.length;
        group(writer, 0, 0, mediaLayers, this.background ? 'Background' : 'Media', this.background ? 0 : 100);
        if (!this.background) {
            const platform = quad(0, floorY * 32, width * 32, 96, [0, 0, 1, 0, 0, 1, 1, 1], -1, [90, 98, 110, 255]);
            const platformData = await writer.raw(ints(platform));
            writer.item(5, mediaLayers, [0, 3, 0, 2, 1, platformData, -1, ...packedName('Platform', 3)]);
            group(writer, 1, mediaLayers, 1, 'Platform');
        }
        const tiles = new Uint8Array(width * height * 4);
        for (let y = floorY; y < height; y++) for (let x = 0; x < width; x++) tiles[(y * width + x) * 4] = 1;
        tiles[((floorY - 2) * width + Math.floor(width / 2)) * 4] = 192; // ENTITY_OFFSET + ENTITY_SPAWN
        const tileData = await writer.raw(tiles);
        const gameLayer = mediaLayers + (this.background ? 0 : 1);
        writer.item(5, gameLayer, [0, 2, 0, 3, width, height, 1, 255, 255, 255, 255, -1, 0, -1, tileData, ...packedName('Game', 3), -1, -1, -1, -1, -1]);
        group(writer, this.background ? 1 : 2, gameLayer, 1, 'Game');
        if (this.animated) writer.item(6, 0, this.points);
        return writer.finish();
    }
}

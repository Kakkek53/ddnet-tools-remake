import test from 'node:test';
import assert from 'node:assert/strict';
import { inflateSync } from 'node:zlib';
import { MediaMap, planMedia, frameEnvelope, packedName } from '../map-writer.js';

// Independent DATA v4 reader: validates header/table boundaries, item references,
// and zlib blocks rather than just comparing writer output to snapshots.
async function readMap(blob) {
    const b = Buffer.from(await blob.arrayBuffer());
    const int = n => b.readInt32LE(n);
    assert.equal(b.toString('ascii', 0, 4), 'DATA');
    assert.equal(int(4), 4); assert.equal(int(8), b.length - 16);
    const [nt, ni, nd, itemSize, dataSize] = [16, 20, 24, 28, 32].map(int);
    const itemOffsetsAt = 36 + nt * 12, dataOffsetsAt = itemOffsetsAt + ni * 4;
    const sizesAt = dataOffsetsAt + nd * 4, itemsAt = sizesAt + nd * 4;
    const rawAt = itemsAt + itemSize;
    assert.equal(int(12), rawAt - 16); assert.equal(rawAt + dataSize, b.length);
    const items = [];
    let seen = 0;
    for (let t = 0; t < nt; t++) {
        const at = 36 + t * 12, type = int(at), start = int(at + 4), count = int(at + 8);
        assert.equal(start, seen);
        for (let i = start; i < start + count; i++) {
            const offset = int(itemOffsetsAt + i * 4), atItem = itemsAt + offset;
            const size = int(atItem + 4), next = i + 1 < ni ? int(itemOffsetsAt + (i + 1) * 4) : itemSize;
            assert.equal(size + 8, next - offset); assert.equal(size % 4, 0);
            assert.equal(int(atItem) >>> 16, type);
            items.push({ type, id: int(atItem) & 65535, values: Array.from({length:size/4}, (_, k) => int(atItem+8+k*4)) });
        }
        seen += count;
    }
    assert.equal(seen, ni);
    const data = [];
    for (let i = 0; i < nd; i++) {
        const start = int(dataOffsetsAt + i * 4), end = i + 1 < nd ? int(dataOffsetsAt + (i+1)*4) : dataSize;
        const block = inflateSync(b.subarray(rawAt + start, rawAt + end));
        assert.equal(block.length, int(sizesAt + i * 4)); data.push(block);
    }
    return { items, data };
}
const get = (m, type) => m.items.filter(x => x.type === type);
function evaluate(points, time, total) {
    const t = ((time % total) + total) % total;
    let value = points[5];
    for (let i = 0; i < points.length; i += 6) { if (points[i] > t) break; value = points[i+5]; }
    return value;
}
test('STEP envelopes show exactly one frame across boundaries and wraparound', () => {
    for (const [duration, fps] of [[1.137, 30], [2, 60], [0.017, 60], [1.2, 1], [0.001, 1]]) {
        const plan = planMedia(320,180,256,duration,fps);
        const envs = Array.from({length:plan.count},(_, i)=>frameEnvelope(i,plan));
        for (const env of envs) {
            assert.equal(env.at(-6), plan.totalMs);
            for (let j = 6; j < env.length; j += 6) assert.ok(env[j] > env[j-6]);
        }
        const times = [-0.01, 0, plan.totalMs-0.01, plan.totalMs, plan.totalMs+0.01];
        for (let i = 1; i < plan.count; i++) { const t = Math.round(i * 1000 / fps); times.push(t-0.001, t, t+0.001); }
        for (const t of times) assert.equal(envs.filter(e=>evaluate(e,t,plan.totalMs)===1024).length,1,`visible at ${t}`);
    }
});
test('plans honor memory, duration, frame, and resolution limits', () => {
    assert.throws(()=>planMedia(1920,1080,1024,60,60), /600 frames/);
    assert.throws(()=>planMedia(1920,1080,1024,10,60), /texture memory/);
    assert.throws(()=>planMedia(0,1080,512,1,1), /valid source/);
    const p = planMedia(1920,1080,512,5,10);
    assert.equal(p.count,50);assert.equal(p.width,512);assert.equal(p.height,288);
    assert.ok(p.pages.length>1);assert.ok(p.pages.length<=64);
    assert.equal(p.pages.reduce((n,p)=>n+p.frames,0),p.count);
});
test('embedded image, quads, groups, spawn and game layer form a valid DATA file', async () => {
    const plan = planMedia(160,90,256,1,1), writer = new MediaMap(plan,false);
    const page = plan.pages[0], rgba = new Uint8Array(page.width*page.height*4).fill(255);
    await writer.addAtlas(page,rgba);
    const map = await readMap(await writer.finish());
    assert.equal(get(map,3).length,0); assert.equal(get(map,6).length,0);
    const im=get(map,2)[0].values;assert.deepEqual(im.slice(0,4),[1,page.width,page.height,0]);assert.deepEqual(map.data[im[5]],Buffer.from(rgba));
    const groups=get(map,4);assert.equal(groups.length,2);
    const layers=get(map,5);assert.equal(layers.length,3);
    const quadLayer=layers[0].values;assert.equal(quadLayer[1],3);assert.equal(map.data[quadLayer[5]].length,152);
    const quad=map.data[quadLayer[5]];assert.equal(quad.readInt32LE(36*4),-1); // no color envelope for an image
    const game=layers.at(-1).values;assert.equal(game.length*4,92);assert.equal(game[6],1);
    const tiles=map.data[game[14]];assert.equal(tiles.length,game[4]*game[5]*4);assert.ok(tiles.includes(192));
    for(const g of groups) assert.ok(g.values[5]+g.values[6]<=layers.length);
});
test('multi-atlas video links every quad to synchronized envelopes and shared point item',async()=>{
    const plan=planMedia(640,360,512,5,5),writer=new MediaMap(plan,true);
    assert.ok(plan.pages.length > 1);
    for(const page of plan.pages) await writer.addAtlas(page,new Uint8Array(page.width*page.height*4));
    const map=await readMap(await writer.finish());
    assert.equal(get(map,2).length,plan.pages.length);assert.equal(get(map,3).length,plan.count);
    const pointItem=get(map,6)[0].values;
    let frame=0;
    for(const layer of get(map,5).filter(l=>l.values[1]===3&&l.values[6]>=0)){
        const v=layer.values,bytes=map.data[v[5]];assert.equal(bytes.length,v[4]*152);
        for(let i=0;i<v[4];i++){assert.equal(bytes.readInt32LE(i*152+36*4),frame++);}
    }
    assert.equal(frame,plan.count);
    for(const env of get(map,3)){
        const v=env.values;assert.equal(v[0],2);assert.equal(v[1],4);assert.equal(v[12],1);
        assert.deepEqual(pointItem.slice(v[2]*6,(v[2]+v[3])*6),frameEnvelope(env.id,plan));
    }
});
test('cancellation prevents producing partial output',async()=>{
    const controller=new AbortController(),plan=planMedia(32,32,128,1,1),writer=new MediaMap(plan,false,controller.signal);
    controller.abort();await assert.rejects(()=>writer.addAtlas(plan.pages[0],new Uint8Array(plan.pages[0].width*plan.pages[0].height*4)),{name:'AbortError'});
});
test('names use DDNet signed-byte packing',()=>{
    const name=packedName('Game',3);assert.equal(name[0]>>>0,0xc7e1ede5);assert.equal(name.at(-1)&255,0);
});

import { MediaMap, planMedia, checkAbort } from './map-writer.js';

const $ = id => document.getElementById(id);
const fileInput = $('media-file');
const video = $('media-video');
const image = $('media-image');
const status = $('conversion-status');
let source = null, sourceURL = null, downloadURL = null, controller = null, generation = 0;
function say(message, error = false) { status.textContent = message; status.classList.toggle('error', error); }
function revokeDownload() {
    if (downloadURL) URL.revokeObjectURL(downloadURL);
    downloadURL = null; $('download-map').hidden = true;
}
function eventOnce(target, name, signal, timeout = 30000) {
    return new Promise((resolve, reject) => {
        checkAbort(signal);
        const clean = () => { clearTimeout(timer); target.removeEventListener(name, ready); target.removeEventListener('error', fail); signal?.removeEventListener('abort', abort); };
        const ready = () => { clean(); resolve(); };
        const fail = () => { clean(); reject(new Error('The browser could not decode this media. Try PNG/JPEG, MP4 (H.264), or WebM.')); };
        const abort = () => { clean(); reject(new DOMException('Conversion cancelled.', 'AbortError')); };
        const timer = setTimeout(() => { clean(); reject(new Error('Media decoding timed out. Try a shorter clip or another encoding.')); }, timeout);
        target.addEventListener(name, ready, { once: true });
        target.addEventListener('error', fail, { once: true });
        signal?.addEventListener('abort', abort, { once: true });
    });
}
async function seek(time, signal) {
    checkAbort(signal);
    if (Math.abs(video.currentTime - time) < 0.000001 && video.readyState >= 2) return;
    const ready = eventOnce(video, 'seeked', signal);
    video.currentTime = time;
    await ready;
    if (video.readyState < 2) await eventOnce(video, 'loadeddata', signal);
    checkAbort(signal);
}
function getPlan() {
    if (!source) throw new Error('Choose an image or video first.');
    let duration = 1, fps = 1, start = 0;
    if (source.animated) {
        start = Number($('clip-start').value);
        const end = Number($('clip-end').value);
        fps = Number($('media-fps').value);
        if (!Number.isFinite(start) || start < 0 || !Number.isFinite(end) || end > source.duration + 0.001 || end <= start) throw new Error('Choose a valid start and end within the video duration.');
        if (!Number.isInteger(fps)) throw new Error('FPS must be a whole number from 1 to 60.');
        duration = end - start;
    }
    return { ...planMedia(source.width, source.height, Number($('media-resolution').value), duration, fps), start };
}
function updateEstimate() {
    revokeDownload();
    if (!source) return;
    try {
        const plan = getPlan();
        $('media-estimate').textContent = `${plan.width} × ${plan.height} px · ${plan.count} frame${plan.count === 1 ? '' : 's'} · ${plan.pages.length} atlas${plan.pages.length === 1 ? '' : 'es'} · ${(plan.textureBytes / 1048576).toFixed(1)} MiB texture memory${source.animated ? ` · ${(plan.totalMs / 1000).toFixed(3)} s loop` : ''}`;
        $('convert-media').disabled = false;
        say('Ready to create your map.');
    } catch (error) { $('convert-media').disabled = true; $('media-estimate').textContent = error.message; say(error.message, true); }
}
fileInput.addEventListener('change', async () => {
    const id = ++generation;
    const file = fileInput.files[0];
    source = null; revokeDownload(); $('convert-media').disabled = true;
    $('preview-empty').hidden = false; video.hidden = true; image.hidden = true;
    $('source-details').textContent = 'No media selected'; $('media-filename').textContent = 'or drop a file here';
    $('video-settings').hidden = true; $('media-estimate').textContent = 'Choose a file to see the export estimate.';
    video.pause(); video.removeAttribute('src'); video.load(); image.removeAttribute('src');
    if (sourceURL) URL.revokeObjectURL(sourceURL);
    sourceURL = null;
    if (!file) { say('Choose an image or a video to get started.'); return; }
    if (!file.size) { say('The selected file is empty.', true); return; }
    $('media-filename').textContent = file.name;
    const animated = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogv)$/i.test(file.name);
    if (!animated && !file.type.startsWith('image/') && !/\.(png|jpe?g|webp|gif|avif|bmp)$/i.test(file.name)) { say('Choose an image or a video file.', true); return; }
    sourceURL = URL.createObjectURL(file);
    say('Reading media…');
    try {
        if (animated) {
            const ready = eventOnce(video, 'loadeddata');
            video.src = sourceURL; video.load(); await ready;
            if (id !== generation) return;
            if (!Number.isFinite(video.duration) || video.duration <= 0 || !video.videoWidth) throw new Error('The video has no usable duration or frames.');
            source = { file, animated, width: video.videoWidth, height: video.videoHeight, duration: video.duration };
            $('clip-start').value = 0;
            $('clip-end').value = Math.min(video.duration, 10).toFixed(3);
            $('clip-end').max = video.duration; $('clip-start').max = video.duration;
            $('source-details').textContent = `${video.videoWidth} × ${video.videoHeight} · ${video.duration.toFixed(3)} seconds · video`;
            video.hidden = false; $('video-settings').hidden = false;
        } else {
            const ready = eventOnce(image, 'load'); image.src = sourceURL; await ready;
            if (id !== generation) return;
            if (!image.naturalWidth) throw new Error('The image could not be decoded.');
            source = { file, animated, width: image.naturalWidth, height: image.naturalHeight };
            $('source-details').textContent = `${image.naturalWidth} × ${image.naturalHeight} · still image`;
            image.hidden = false;
        }
        $('preview-empty').hidden = true;
        updateEstimate();
    } catch (error) { if (id === generation) say(error.message, true); }
});
for (const id of ['media-fps', 'media-resolution', 'clip-start', 'clip-end']) $(id).addEventListener('input', updateEstimate);
const zone = $('media-drop');
zone.addEventListener('dragover', event => { event.preventDefault(); zone.classList.add('dragging'); });
zone.addEventListener('dragleave', () => zone.classList.remove('dragging'));
zone.addEventListener('drop', event => {
    event.preventDefault(); zone.classList.remove('dragging');
    if (controller || !event.dataTransfer.files.length) return;
    fileInput.files = event.dataTransfer.files; fileInput.dispatchEvent(new Event('change'));
});
function busy(value) {
    $('converter-controls').disabled = value;
    $('cancel-conversion').hidden = !value;
    $('conversion-progress').hidden = !value;
    $('converter').setAttribute('aria-busy', String(value));
    video.controls = !value;
}
$('cancel-conversion').addEventListener('click', () => controller?.abort());
$('convert-media').addEventListener('click', async () => {
    if (controller) return;
    let plan;
    try { plan = getPlan(); } catch (error) { say(error.message, true); return; }
    if (typeof CompressionStream === 'undefined') { say('This browser does not support CompressionStream. Use a current Chrome, Firefox, or Safari.', true); return; }
    controller = new AbortController();
    const { signal } = controller;
    const restoreTime = video.currentTime;
    const canvas = document.createElement('canvas');
    const frame = document.createElement('canvas'); frame.width = plan.width; frame.height = plan.height;
    const frameContext = frame.getContext('2d', { willReadFrequently: true });
    const atlasContext = canvas.getContext('2d', { willReadFrequently: true });
    revokeDownload(); busy(true); video.pause();
    $('conversion-progress').max = plan.count; $('conversion-progress').value = 0;
    try {
        const map = new MediaMap(plan, source.animated, signal);
        for (const page of plan.pages) {
            checkAbort(signal);
            canvas.width = page.width; canvas.height = page.height;
            for (let local = 0; local < page.frames; local++) {
                checkAbort(signal);
                const index = page.first + local;
                if (source.animated) await seek(Math.min(plan.start + index / plan.fps, source.duration - 0.00001), signal);
                frameContext.clearRect(0, 0, plan.width, plan.height);
                frameContext.drawImage(source.animated ? video : image, 0, 0, plan.width, plan.height);
                const x = (local % page.columns) * (plan.width + 4) + 2;
                const y = Math.floor(local / page.columns) * (plan.height + 4) + 2;
                // Duplicate a two-pixel border to avoid sampling neighboring frames.
                atlasContext.drawImage(frame, x, y);
                atlasContext.drawImage(frame, 0, 0, 1, plan.height, x - 2, y, 2, plan.height);
                atlasContext.drawImage(frame, plan.width - 1, 0, 1, plan.height, x + plan.width, y, 2, plan.height);
                atlasContext.drawImage(frame, 0, 0, plan.width, 1, x, y - 2, plan.width, 2);
                atlasContext.drawImage(frame, 0, plan.height - 1, plan.width, 1, x, y + plan.height, plan.width, 2);
                for (const [sx, sy, dx, dy] of [[0, 0, x - 2, y - 2], [plan.width - 1, 0, x + plan.width, y - 2], [0, plan.height - 1, x - 2, y + plan.height], [plan.width - 1, plan.height - 1, x + plan.width, y + plan.height]]) atlasContext.drawImage(frame, sx, sy, 1, 1, dx, dy, 2, 2);
                $('conversion-progress').value = index + 1;
                say(`Capturing frame ${index + 1} / ${plan.count}…`);
                // Give the browser time to paint progress and handle cancellation.
                if (index % 4 === 0) await new Promise(resolve => setTimeout(resolve, 0));
            }
            say(`Compressing atlas ${map.nextPage + 1} / ${plan.pages.length}…`);
            await map.addAtlas(page, atlasContext.getImageData(0, 0, page.width, page.height).data);
        }
        say('Writing map layers and envelopes…');
        const blob = await map.finish(); checkAbort(signal);
        downloadURL = URL.createObjectURL(blob);
        const link = $('download-map');
        link.href = downloadURL;
        link.download = (source.file.name.replace(/\.[^.]*$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 48) || 'media') + '.map';
        link.hidden = false;
        say(`Map ready · ${(blob.size / 1048576).toFixed(2)} MiB · ${plan.count} frame${plan.count === 1 ? '' : 's'}${source.animated ? ' · synchronized looping STEP envelopes' : ''}. Download and open it in the DDNet editor.`);
        link.focus();
    } catch (error) { say(error.name === 'AbortError' ? 'Conversion cancelled. You can change settings and try again.' : error.message, error.name !== 'AbortError'); }
    finally {
        canvas.width = canvas.height = frame.width = frame.height = 1;
        controller = null; busy(false);
        if (source?.animated) video.currentTime = restoreTime;
    }
});
window.addEventListener('pagehide', () => { controller?.abort(); if (sourceURL) URL.revokeObjectURL(sourceURL); if (downloadURL) URL.revokeObjectURL(downloadURL); });

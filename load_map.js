/* Keep these globals available to the precompiled DDNet engines. */
var g_DemoFile;
var g_MapFile;
var viewerStarted = false;
var Module = {
    print: function (text) { console.log(text); },
    printErr: function (text) { console.error(text); },
    canvas: document.getElementById('canvas'),
    arguments: [],
    setStatus: function (text) { SetStatus(text || 'Engine ready. Click the viewer to interact.'); },
    onRuntimeInitialized: function () { SetStatus('Engine initialized. Opening your file…'); },
    onAbort: function () { SetStatus('The DDNet engine could not start. Reload the page to try again in a desktop browser.', true); }
};
function SetStatus(message, error) {
    var status = document.getElementById('viewer-status');
    I18n.text(status, message);
    status.classList.toggle('error', !!error);
}
function RemoveEls() {
    document.getElementById('upload-tools').hidden = true;
    document.getElementById('viewer-shell').hidden = false;
    document.body.classList.add('viewer-active');
}
function GetMapFromURL() {
    return { map: new URLSearchParams(location.search).get('map') || '' };
}
function StartViewer(kind, name, result) {
    if (viewerStarted) return;
    if (!window.crossOriginIsolated || typeof SharedArrayBuffer === 'undefined') {
        SetStatus('Browser threads are not ready. Wait a moment and reload this page. Use HTTPS or localhost in a browser with WebAssembly threads support.', true);
        return;
    }
    viewerStarted = true;
    Module.arguments = [kind === 'map' ? '-m' : '-d', name, result.byteLength.toString()];
    if (kind === 'map') g_MapFile = new Uint8Array(result);
    else g_DemoFile = new Uint8Array(result);
    document.getElementById('viewer-filename').textContent = name;
    RemoveEls();
    SetStatus('Downloading the DDNet engine. The first launch may take a moment…');
    var engine = document.createElement('script');
    engine.src = kind === 'map' ? 'DDNet_map.js' : 'DDNet_demo.js';
    engine.onerror = function () { SetStatus('Engine download failed. Reload the page and try again.', true); };
    document.head.appendChild(engine);
    Module.canvas.focus();
}
function LoadMapFileImpl(name, result) { StartViewer('map', name, result); }
function ReadLocalFile(kind) {
    if (viewerStarted) return;
    var input = document.getElementById(kind === 'map' ? 'MapFileInput' : 'DemoFileInput');
    var file = input.files[0];
    if (!file) { SetStatus('Choose a .' + kind + ' file first.', true); input.focus(); return; }
    if (!file.name.toLowerCase().endsWith('.' + kind)) { SetStatus('This tool needs a .' + kind + ' file.', true); return; }
    if (!file.size) { SetStatus('This file is empty. Choose another file.', true); return; }
    var reader = new FileReader();
    reader.onload = function () { StartViewer(kind, file.name, reader.result); };
    reader.onerror = function () { SetStatus('This file could not be read. Please select it again.', true); };
    SetStatus('Reading ' + file.name + '…');
    reader.readAsArrayBuffer(file);
}
function LoadDemoFile() { ReadLocalFile('demo'); }
function LoadMapFile() { ReadLocalFile('map'); }
async function OnLoad() {
    var map = GetMapFromURL().map;
    if (!map) return;
    SetStatus('Downloading map…');
    try {
        var response = await fetch(map + '.map');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        var data = await response.arrayBuffer();
        if (!data.byteLength) throw new Error('Empty map');
        LoadMapFileImpl(map, data);
    } catch (error) { SetStatus('Could not download the map. Check the link or choose a local file. ' + error.message, true); }
}
window.addEventListener('load', OnLoad);

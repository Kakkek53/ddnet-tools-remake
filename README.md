# DDNet Tools Remake

A responsive, browser-based toolkit built on the original DDNet Tools.

## Tools

- **Map & Demo Viewer** — open local `.map` and `.demo` files using the existing DDNet WebAssembly engine. Direct `load_map.html?map=URL_WITHOUT_EXTENSION` links remain supported; remote servers must allow CORS.
- **Media to Map** — convert browser-readable images and video clips into standalone `.map` files with embedded RGBA textures. Video exports use texture atlases, per-frame synchronized color envelopes, and STEP visibility switching.
- **Team Colors** — compare the original 64-team palette with the golden-angle palette, including hue ordering.

## Development

No build step or package installation is required. Serve the repository with `python -m http.server 8000` and open `http://localhost:8000`. Do not open HTML files using `file://`.

The viewer requires HTTPS (or localhost), WebAssembly, and SharedArrayBuffer. `enable-threads.js` supplies cross-origin isolation through a service worker for GitHub Pages; first use may reload the page. The engine assets are loaded only after a file is opened. Select files after this initialization completes.

Shared layout and responsive styles live in `styles.css`; navigation and drag-and-drop behavior live in `ui.js`. The precompiled `DDNet_*` assets are unchanged.

## Credits

Based on [DDNet Tools](https://github.com/ddnet/ddnet.github.io) and [Jupeyy’s DDNet web preview](https://github.com/Jupeyy/ddnet/tree/web_preview). Team colors follow the [DDNet golden-angle update](https://github.com/ddnet/ddnet/pull/7129).

## Media to Map

Open `media-map.html`, select an image or video, choose a maximum pixel edge, and create/download the map. For videos choose **1–60 FPS** and a start/end time in seconds. The clip repeats automatically and contains no audio. The first five seconds are selected by default. Animated image formats are treated as a still image; use a video for frame animation. Source codecs depend on the browser (PNG/JPEG/WebP, H.264 MP4 and WebM are typical choices).

The generated file contains embedded textures (atlases for small frames), editable quad layers, one four-channel synchronized color envelope per video frame, and a minimal game layer with a spawn. Only object mode adds a visible platform. It is a decorative image/video map, not automatic collision generation from the source image. Open it in the DDNet editor to build around the media or adjust the quads/envelopes.

Envelope times are rounded individually to milliseconds (`round(frameIndex * 1000 / FPS)`), which avoids accumulating the error from rounding a fixed frame interval. Every envelope has the same end timestamp and uses STEP curves; DDNet's envelope modulo evaluation provides seamless repetition. A final sub-millisecond frame that cannot be represented is omitted. Atlas borders duplicate edge pixels to reduce texture bleeding. Processing stays local and does not require FFmpeg, a backend, or external JavaScript dependencies.

Limits: 600 sampled frames, 64 atlas images, 2048 px per packed atlas edge (high-resolution frames use exact-size standalone textures up to 4096 px), 512 MiB total uncompressed texture memory, and 600 seconds per selected clip. Quality options run from 512 px to original resolution (up to 4096 px). Images default to original quality; videos default to a 1920 px maximum edge. Native-size inputs preserve their exact pixel dimensions; downscaling preserves aspect ratio to the nearest even pixel. No upscaling is applied. These bounds prevent accidental memory exhaustion; large maps can still take time to decode, compress, download, and load in DDNet. Cancel is available during conversion. Downloads use an explicit button after successful completion.

### Format references and tests

The writer follows DDNet's [`src/game/mapitems.h`](https://github.com/ddnet/ddnet/blob/master/src/game/mapitems.h), [`src/engine/shared/datafile.cpp`](https://github.com/ddnet/ddnet/blob/master/src/engine/shared/datafile.cpp), [`src/game/editor/mapitems/map_io.cpp`](https://github.com/ddnet/ddnet/blob/master/src/game/editor/mapitems/map_io.cpp), and [`src/game/map/render_map.cpp`](https://github.com/ddnet/ddnet/blob/master/src/game/map/render_map.cpp). Source files were inspected at DDNet commit `a3c7a56d458f6ad151987098def4018e0cc85626`.

Run `node --test tests/map-writer.test.mjs` (Node 22+). Tests independently parse DATA v4 tables and inflate blocks, validate texture/quad/game-layer references, check names, resource limits and cancellation, and evaluate STEP envelopes at frame boundaries and loop wraparound.

### Full-screen backgrounds

The default layout uses a screen-filling background: media is centered at `(0,0)` in a group with **0/0 parallax**, independent of player movement and camera zoom. Quads cover at least the reference bounds `(-832,-640)` to `(832,640)` while preserving source aspect ratio. DDNet normal viewports are capped at 1500×1050 world units, so this covers normal aspect ratios including ultrawide. Screens with different aspect ratios crop the edges rather than stretch the image. The game layer remains in a separate 100/100 group. Background exports have no visible platform or untextured gray overlay; object mode retains its separate platform group. Select **Object inside the map** to use the original world-space placement.

Quality and in-map size are independent: increasing texture pixels adds detail without shrinking the background. Full-resolution frames larger than 1024 px use exact-size textures with full 0–1 UVs, avoiding power-of-two padding and atlas UV quantization. For long high-resolution videos, reduce FPS or the selected duration to stay within the explicit texture-memory and image-count limits; quality is never silently lowered.

## Interface languages

All four web pages support English, Russian, and German. The language selector in the header updates navigation, help, accessibility labels, conversion estimates, progress and validation messages without reloading or discarding the selected file/download. The initial language follows the browser; an explicit selection is saved in `localStorage` when available. Blocked storage falls back to a working session selection.

The shared catalog and safe text rendering live in `i18n.js`. Keep English source messages as catalog keys, and use `I18n.text(elementOrId, key, parameters)` for dynamic content that must update during language changes. User text is never injected as HTML. The precompiled DDNet engine's own canvas controls and native browser media controls retain their built-in languages; the surrounding viewer interface is localized.

Run all format and translation tests with `node --test tests/*.test.mjs`.

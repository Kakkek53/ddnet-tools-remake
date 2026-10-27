# DDNet Tools Remake

A responsive, browser-based toolkit built on the original DDNet Tools.

## Tools

- **Map & Demo Viewer** — open local `.map` and `.demo` files using the existing DDNet WebAssembly engine. Direct `load_map.html?map=URL_WITHOUT_EXTENSION` links remain supported; remote servers must allow CORS.
- **Team Colors** — compare the original 64-team palette with the golden-angle palette, including hue ordering.

## Development

No build step or package installation is required. Serve the repository with `python -m http.server 8000` and open `http://localhost:8000`. Do not open HTML files using `file://`.

The viewer requires HTTPS (or localhost), WebAssembly, and SharedArrayBuffer. `enable-threads.js` supplies cross-origin isolation through a service worker for GitHub Pages; first use may reload the page. The engine assets are loaded only after a file is opened. Select files after this initialization completes.

Shared layout and responsive styles live in `styles.css`; navigation and drag-and-drop behavior live in `ui.js`. The precompiled `DDNet_*` assets are unchanged.

## Credits

Based on [DDNet Tools](https://github.com/ddnet/ddnet.github.io) and [Jupeyy’s DDNet web preview](https://github.com/Jupeyy/ddnet/tree/web_preview). Team colors follow the [DDNet golden-angle update](https://github.com/ddnet/ddnet/pull/7129).

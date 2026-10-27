document.querySelectorAll('nav a').forEach(link => { if (link.getAttribute('href') === (location.pathname.split('/').pop() || 'index.html')) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); } });
for (const [id, target] of [['MapFileInput', 'map-name'], ['DemoFileInput', 'demo-name']]) {
 const input = document.getElementById(id); if (!input) continue;
 const update = () => document.getElementById(target).textContent = input.files[0]?.name || 'No file selected';
 input.addEventListener('change', update);
 const zone = input.closest('label');
 zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragging'); });
 zone.addEventListener('dragleave', () => zone.classList.remove('dragging'));
 zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('dragging'); input.files = e.dataTransfer.files; update(); });
}

(() => {
  const nav = document.querySelector('.navigation');
  const section = document.querySelector('.navigation > section');
  const handle = document.querySelector('.navigation .resize-handle');
  if (!nav || !section || !handle) return;

  const storageKey = 'sectionWidth';
  const root = document.documentElement;

  function px(value) { return `${Math.round(value)}px`; }

  function getNumberValue(v) {
    if (!v) return null;
    return parseFloat(v.replace('px','').trim());
  }

  const saved = localStorage.getItem(storageKey);
  if (saved) root.style.setProperty('--section-width', px(Number(saved)));

  let dragging = false;
  let startX = 0;
  let startWidth = 0;
  const MIN_WIDTH = 192;
  const MAX_WIDTH = 360;

  handle.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    startWidth = section.getBoundingClientRect().width;
    document.body.style.userSelect = 'none';
    handle.setPointerCapture(e.pointerId);
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    document.body.style.userSelect = '';
    try { handle.releasePointerCapture && handle.releasePointerCapture(e.pointerId); } catch (err) {}
    const final = getNumberValue(getComputedStyle(root).getPropertyValue('--section-width')) || startWidth;
    localStorage.setItem(storageKey, Math.round(final));
  }

  function onMove(e) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const newWidth = startWidth + dx;
    const clamped = Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH);
    root.style.setProperty('--section-width', px(clamped));
  }

  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
})();
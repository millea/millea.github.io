(() => {
  'use strict';
  const viewer = document.querySelector('#skytree');
  const panel = document.querySelector('#viewer-panel');
  const rotate = document.querySelector('#rotate');
  const loading = document.querySelector('#loading');
  const error = document.querySelector('#error');
  const buttons = [...document.querySelectorAll('[data-view]')];
  const tools = [...document.querySelectorAll('.tools button')];
  const views = {
    full: { target: '0m 3.1m 0m', orbit: '30deg 82deg 15m', title: 'タワー全景', index: '01 / 04' },
    deck: { target: '0m 3.45m 0m', orbit: '30deg 72deg 2.1m', title: '天望デッキ', index: '02 / 04' },
    gallery: { target: '0m 4.46m 0m', orbit: '30deg 78deg 1.5m', title: '天望回廊', index: '03 / 04' },
    base: { target: '0m 0.46m 0m', orbit: '30deg 70deg 3.7m', title: '足元の構造', index: '04 / 04' }
  };
  let ready = false;
  let timeout;
  function setRotation(enabled) {
    viewer.autoRotate = enabled;
    viewer.rotationPerSecond = '12deg';
    rotate.setAttribute('aria-pressed', String(enabled));
    rotate.setAttribute('aria-label', enabled ? '自動回転を停止' : '自動回転を開始');
    document.querySelector('#rotate-symbol').textContent = enabled ? 'Ⅱ' : '▶';
    document.querySelector('#rotate-label').textContent = enabled ? '回転を停止' : '自動回転';
  }
  function setView(name) {
    if (!ready) return;
    const view = views[name];
    setRotation(false);
    viewer.resetTurntableRotation(0);
    viewer.cameraTarget = view.target;
    viewer.cameraOrbit = view.orbit;
    buttons.forEach(button => {
      const selected = button.dataset.view === name;
      button.classList.toggle('selected', selected);
      if (button.classList.contains('view-button')) button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelector('#view-title').textContent = view.title;
    document.querySelector('#view-index').textContent = view.index;
    document.querySelector('.height-mark').hidden = name !== 'full';
  }
  function fail() {
    ready = false;
    clearTimeout(timeout);
    loading.hidden = true;
    error.hidden = false;
    setRotation(false);
    [...buttons, ...tools].forEach(button => { button.disabled = true; });
  }
  viewer.addEventListener('progress', event => {
    const value = event.detail.totalProgress;
    document.querySelector('#progress').value = value;
    document.querySelector('#load-progress').textContent = `3Dモデルを読み込み中… ${Math.round(value * 100)}%`;
  });
  viewer.addEventListener('load', () => {
    ready = true;
    clearTimeout(timeout);
    loading.hidden = true;
    error.hidden = true;
    [...buttons, ...tools].forEach(button => { button.disabled = false; });
    setView('full');
  });
  viewer.addEventListener('error', fail);
  timeout = setTimeout(fail, 60000);
  buttons.forEach(button => button.addEventListener('click', () => {
    setView(button.dataset.view);
    if (button.classList.contains('text-link')) panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  }));
  rotate.addEventListener('click', () => setRotation(!viewer.autoRotate));
  viewer.addEventListener('pointerdown', () => { if (ready) setRotation(false); });
  function zoom(factor) {
    if (!ready) return;
    const { theta, phi, radius } = viewer.getCameraOrbit();
    viewer.cameraOrbit = `${theta}rad ${phi}rad ${Math.min(24, Math.max(0.5, radius * factor))}m`;
  }
  document.querySelector('#zoom-in').addEventListener('click', () => zoom(0.8));
  document.querySelector('#zoom-out').addEventListener('click', () => zoom(1.25));
  document.querySelector('#reset').addEventListener('click', () => setView('full'));
  document.querySelector('#theme').addEventListener('click', event => {
    const dark = panel.classList.toggle('dark');
    event.currentTarget.setAttribute('aria-pressed', String(dark));
    event.currentTarget.setAttribute('aria-label', dark ? '3D背景を明るくする' : '3D背景を暗くする');
  });
  document.querySelector('#retry').addEventListener('click', () => location.reload());
  document.addEventListener('visibilitychange', () => { if (document.hidden) setRotation(false); });
})();

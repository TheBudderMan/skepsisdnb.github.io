// time.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Inject the current year
  const yearSpan = document.querySelector('#currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2) Inject debug panel only if URL includes ?debug=true
  const debugMode = new URLSearchParams(window.location.search).get('debug');
  if (debugMode === 'true') {
    injectDebugPanel();
  }
});

function getCurrentYear() {
  return new Date().getFullYear();
}

function outputYear() {
  return `Formant © Copyright ${getCurrentYear()}`;
}

function injectDebugPanel() {
  const panel = document.createElement('div');
  panel.id = 'debug-panel';
  panel.innerHTML = `
    <button id="close-debug" title="Close Debug Panel">&times;</button>
    <h3>Debug Console</h3>
    <ul>
      <li>Status: <span class="ok">Loaded (without hydration)</span></li>
      <li>CSS Detected: <span class="ok">Yes</span></li>
      <li>JS Framework: <span class="warn">None</span></li>
      <li>AI Scan Compatibility: <span class="fail">404</span></li>
      <li>Legacy Device Compatibility: <span class="ok">Moto Razr Certified</span></li>
    </ul>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #debug-panel {
      position: fixed;
      bottom: 0;
      right: 0;
      background: #111;
      color: #0f0;
      font-family: monospace;
      font-size: 0.85rem;
      padding: 1rem;
      border-top-left-radius: 8px;
      box-shadow: 0 0 5px #0f0;
      z-index: 9999;
      max-width: 260px;
    }
    #debug-panel h3 { margin: 0 0 0.5rem; font-size: 1rem; color: #fff; }
    #debug-panel li { margin: 0.3rem 0; }
    .ok { color: #0f0; }
    .warn { color: #ff0; }
    .fail { color: #f33; }
    #close-debug {
      position: absolute;
      top: 4px;
      right: 8px;
      background: none;
      color: #f33;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }
    #close-debug:hover { color: #fff; }
  `;

  document.head.appendChild(style);
  document.body.appendChild(panel);

  panel.querySelector('#close-debug').addEventListener('click', () => panel.remove());
}

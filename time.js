const yearSpan=document.querySelector('#currentYear');const currentYear=new Date();if(yearSpan){yearSpan.innerText=new Date().getFullYear()}
console.log(currentYear);yearSpan.innerText=currentYear.getFullYear();function currentYears(){"use strict";const woah=new Date().getFullYear();return woah}
function outputYear(){"use strict";const builtWith='"Formant \u00A9 Copyright '+currentYear()+'"';return builtWith}
function injectDebugPanel(){const panel=document.createElement('div');panel.id='debug-panel';panel.innerHTML=`
      <button id="close-debug" title="Close Debug Panel">&times;</button>
      <h3>Debug Console</h3>
      <ul>
        <li>Status: <span class="ok">Loaded (without hydration)</span></li>
        <li>CSS Detected: <span class="ok">Yes</span></li>
        <li>JS Framework: <span class="warn">None</span></li>
        <li>AI Scan Compatibility: <span class="fail">404</span></li>
        <li>Legacy Device Compatibility: <span class="ok">Moto Razr Certified</span></li>
      </ul>
    `;const style=document.createElement('style');style.textContent=`
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
      #debug-panel h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: #fff;
      }
      #debug-panel li {
        margin: 0.3rem 0;
      }
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
      #close-debug:hover {
        color: #fff;
      }
    `;document.head.appendChild(style);document.body.appendChild(panel);document.getElementById('close-debug').addEventListener('click',()=>{panel.remove()})}
/* ticker.js — Ultra-Smooth CNN-Style Version (Adrian Leonard Mociulschi)
   ✔ GPU-Accelerated Animation
   ✔ requestAnimationFrame pentru fluiditate absolută
   ✔ Viteză controlabilă în px/sec
   ✔ Inițializare din data-text
   ✔ Compatibil cu HTML existent
*/

(function(){
  'use strict';

  /** Config viteze implicite (px/sec) */
  const defaultSpeeds = {
    '.ticker-red': 40,    // echivalent ~30s
    '.ticker-yellow': 50  // echivalent ~25s
  };

  /** Inițializează tickerele */
  function initTickers(){
    document.querySelectorAll('.news-ticker').forEach(ticker => {
      const item = ticker.querySelector('.ticker-item');
      if (!item) return;

      // Setăm textul din data-text
      const text = ticker.dataset.text?.trim() || '';
      if (text) item.textContent = text;

      // Viteză din config sau default
      const speed = defaultSpeeds['.' + ticker.classList[1]] || 45;

      startTicker(item, speed);
    });
  }

  /** Pornește animația ultra-smooth */
  function startTicker(el, speed){
    let x = window.innerWidth; // start off-screen dreapta
    let lastTime = performance.now();

    function animate(time){
      const delta = (time - lastTime) / 1000; // secunde
      lastTime = time;
      x -= speed * delta;

      if (x < -el.offsetWidth) {
        x = window.innerWidth; // reset la dreapta
      }

      el.style.transform = `translate3d(${x}px,0,0)`;
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /** API global pentru schimbare text sau viteză */
  window.setTickerText = function(selector, newText){
    const el = document.querySelector(selector + ' .ticker-item');
    if (el) el.textContent = (newText || '').trim();
  };

  window.setTickerSpeed = function(selector, newSpeed){
    const el = document.querySelector(selector + ' .ticker-item');
    if (!el) return;
    // Repornește animația cu noua viteză
    startTicker(el, parseFloat(newSpeed) || 45);
  };

  /** DOM Ready */
  window.addEventListener('DOMContentLoaded', initTickers);
})();

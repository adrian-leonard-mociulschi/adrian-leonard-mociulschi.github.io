/* ticker.js — Ultra-Smooth CNN-Style Version (Optimizat)
   ✔ GPU-Accelerated Animation
   ✔ requestAnimationFrame pentru fluiditate absolută
   ✔ Viteză controlabilă în px/sec (dinamic)
   ✔ Inițializare din data-text
   ✔ Responsivitate la resize
   ✔ Prevenire animații suprapuse
*/

(function(){
  'use strict';

  /** Config viteze implicite (px/sec) */
  const defaultSpeeds = {
    '.ticker-red': 40,
    '.ticker-yellow': 50
  };

  /** Map pentru stocarea animațiilor active */
  const tickerState = new Map();

  /** Inițializează tickerele */
  function initTickers(){
    document.querySelectorAll('.news-ticker').forEach(ticker => {
      const item = ticker.querySelector('.ticker-item');
      if (!item) return;

      // Setăm textul din data-text sau păstrăm originalul
      const text = ticker.dataset.text?.trim() || item.textContent;
      item.textContent = text;

      // Viteză din config sau default
      const speed = defaultSpeeds['.' + ticker.classList[1]] || 45;

      startTicker(ticker, item, speed);
    });
  }

  /** Pornește animația ultra-smooth */
  function startTicker(container, el, speed){
    // Anulează animația anterioară dacă există
    if (tickerState.has(container)) {
      cancelAnimationFrame(tickerState.get(container).rafId);
    }

    let x = window.innerWidth; // start off-screen dreapta
    let lastTime = performance.now();

    // Stocăm viteza într-un obiect pentru update dinamic
    const state = { speed: speed, rafId: null };
    tickerState.set(container, state);

    function animate(time){
      const delta = (time - lastTime) / 1000; // secunde
      lastTime = time;
      x -= state.speed * delta;

      if (x < -el.offsetWidth) {
        x = window.innerWidth; // reset la dreapta
      }

      el.style.transform = `translate3d(${x}px,0,0)`;
      state.rafId = requestAnimationFrame(animate);
    }

    state.rafId = requestAnimationFrame(animate);

    // Responsivitate la resize
    window.addEventListener('resize', () => {
      x = window.innerWidth;
    });
  }

  /** API global pentru schimbare text */
  window.setTickerText = function(selector, newText){
    const el = document.querySelector(selector + ' .ticker-item');
    if (el) el.textContent = (newText || '').trim();
  };

  /** API global pentru schimbare viteză dinamică */
  window.setTickerSpeed = function(selector, newSpeed){
    const container = document.querySelector(selector);
    if (!container || !tickerState.has(container)) return;
    tickerState.get(container).speed = parseFloat(newSpeed) || 45;
  };

  /** DOM Ready */
  window.addEventListener('DOMContentLoaded', initTickers);
})();

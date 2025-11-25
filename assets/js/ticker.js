=== ticker.js ===
/* =============================
   ticker.js — Premium Continuous Scroll Version
   ✔ GPU-Accelerated CSS Animation
   ✔ Text duplicat pentru scroll infinit
   ✔ API global pentru schimbare text și viteză
   ============================= */

(function(){
  'use strict';

  /** Inițializează tickerele */
  function initTickers(){
    document.querySelectorAll('.news-ticker').forEach(ticker => {
      const item = ticker.querySelector('.ticker-item');
      if (!item) return;

      // Setăm textul din data-text sau păstrăm originalul
      const text = ticker.dataset.text?.trim() || item.textContent.trim();

      // Duplicăm textul pentru scroll continuu
      item.textContent = `${text} • ${text}`;

      // Viteză din atribut sau default
      const speed = parseFloat(ticker.dataset.speed) || 20;

      // Setăm durata animației în funcție de lățimea textului
      const itemWidth = item.scrollWidth;
      const duration = itemWidth / speed; // secunde

      item.style.animationDuration = `${duration}s`;
    });
  }

  /** API global pentru schimbare text */
  window.setTickerText = function(selector, newText){
    const el = document.querySelector(selector + ' .ticker-item');
    if (el) el.textContent = `${(newText || '').trim()} • ${(newText || '').trim()}`;
  };

  /** API global pentru schimbare viteză */
  window.setTickerSpeed = function(selector, newSpeed){
    const el = document.querySelector(selector + ' .ticker-item');
    if (!el) return;
    const width = el.scrollWidth;
    const duration = width / (parseFloat(newSpeed) || 20);
    el.style.animationDuration = `${duration}s`;
  };

  /** DOM Ready */
  window.addEventListener('DOMContentLoaded', initTickers);
})();


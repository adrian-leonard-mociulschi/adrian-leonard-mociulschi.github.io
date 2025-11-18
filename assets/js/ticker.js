// ticker.js — Adrian (robust, no-persist, restart-safe)
// - Nu folosește cookies/localStorage.
// - Poate seta textul dinamic pentru oricâte tickere.
// - Citește implicit mesajul din atributul data-text al fiecărui ticker.
// - Expune global window.setTickerText(selector, newText) și window.restartTicker(selector).

(function(){
  'use strict';

  /**
   * Setează textul unui ticker și repornește animația CSS.
   * @param {string|Element} selector - selector CSS sau elementul container al tickerului.
   * @param {string} newText - textul nou afișat în .ticker-item
   */
  function setTickerText(selector, newText){
    const ticker = (typeof selector === 'string') ? document.querySelector(selector) : selector;
    if (!ticker) return;

    // Expectăm o structură de tip:
    // <div class="news-ticker ticker-red"><div class="ticker-track"><span class="ticker-item"></span></div></div>
    const item = ticker.querySelector('.ticker-item') || ticker.querySelector('[data-ticker-item]');
    if (!item) return;

    // Oprește animația
    ticker.classList.remove('is-running');

    // Setează textul
    item.textContent = (newText || '').trim();

    // Forțează reflow pentru resetarea timeline-ului CSS
    void item.offsetWidth; // important: declanșează reflow

    // Repornire animație
    ticker.classList.add('is-running');
  }

  /**
   * Repornire fără schimbare de text (util dacă doar s-au schimbat stiluri).
   */
  function restartTicker(selector){
    const el = (typeof selector === 'string') ? document.querySelector(selector) : selector;
    if (!el) return;
    el.classList.remove('is-running');
    // Reflow
    void el.offsetWidth;
    el.classList.add('is-running');
  }

  /**
   * Inițializează toate tickerele: pornește animația și setează textul din data-text (dacă există).
   */
  function initTickers(){
    document.querySelectorAll('.news-ticker').forEach((t) => {
      // pornește animația (clasa is-running)
      t.classList.add('is-running');

      // află selectorul cel mai specific pentru setTickerText
      // (folosim prima clasă care începe cu "ticker-")
      const tickClass = Array.from(t.classList).find(c => c.indexOf('ticker-') === 0);
      const sel = tickClass ? ('.' + tickClass) : null;

      // determină textul sursă
      const dataText = t.getAttribute('data-text');
      const fallback = t.textContent && t.textContent.trim() ? t.textContent.trim() : '';
      const text = (dataText && dataText.trim()) || fallback || '';

      if (sel && text) {
        setTickerText(sel, text);
      } else if (text) {
        setTickerText(t, text); // direct pe element dacă nu găsim clasa specifică
      }
    });
  }

  // Expunem API-ul minimal în global (pentru a putea fi apelat din alte scripturi/console)
  window.setTickerText = setTickerText;
  window.restartTicker = restartTicker;
  window.initTickers = initTickers;

  // Auto-init la DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    initTickers();

    fetch(`/ticker.json?v=${Date.now()}`)

    // Exemple de setări explicite (comentate):
    setTickerText('.ticker-red', 'Nov 18: România Liberă – Shadows Over the Black Sea: The silent front where Europe’s future is decided.');
    setTickerText('.ticker-yellow', 'Nov 16: Contributors – Noah’s Ark in the Age of Red Alerts. How do we rebuild trust without sacrificing clarity?');
  });
})();

// ticker.js — Adrian (robust, no-persist, restart-safe)
// - Nu folosește cookies/localStorage.
// - Poate seta textul dinamic pentru oricâte tickere.
// - Citește implicit mesajul din atributul data-text al fiecărui ticker.
// - Expune global window.setTickerText(selector, newText) și window.restartTicker(selector).
// - Integrează cu SW: forțează rețeaua și reacționează la actualizări via BroadcastChannel.

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

  // Debounce simplu pentru a evita reporniri multiple în serie
  function debounce(fn, ms){
    let t; return function(){
      clearTimeout(t); const ctx=this, args=arguments;
      t = setTimeout(() => fn.apply(ctx, args), ms);
    };
  }

  // Expunem API-ul minimal în global (pentru a putea fi apelat din alte scripturi/console)
  window.setTickerText = setTickerText;
  window.restartTicker = restartTicker;
  window.initTickers = initTickers;

  // Funcție care aplică textele din obiectul JSON: { "selector": "text", ... }
  function applyTickerMap(map){
    if (!map || typeof map !== 'object') return;
    Object.entries(map).forEach(([selector, text]) => setTickerText(selector, text));
  }

  // Reîncarcă tickerele din /ticker.json (bypass cache browser + SW tratează normalizarea)
  const loadTickersFromNetwork = debounce(function(){
    return fetch('/ticker.json?v=' + Date.now(), { cache: 'no-store' })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(applyTickerMap)
      .catch(() => { /* tăcem; fallback-urile rămân */ });
  }, 50);

  // Auto-init la DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    initTickers();

    // 1) Încearcă să ia textele de pe rețea (cu bypass cache). SW e configurat pentru network-first.
    loadTickersFromNetwork();

    // 2) Fallback-uri locale (opțional): folosite numai dacă nu vine nimic din rețea
    //    Le putem declanșa cu o mică întârziere; dacă rețeaua aduce JSON, aceste setări
    //    vor fi suprascrise imediat, deci nu creează flicker vizibil.
    setTimeout(() => {
      // Exemple: modifică/șterge după nevoie
      setTickerText('.ticker-red', 'Nov 18: România Liberă – Shadows Over the Black Sea: The silent front where Europe’s future is decided.');
      setTickerText('.ticker-yellow', 'Nov 16: Contributors – Noah’s Ark in the Age of Red Alerts. How do we rebuild trust without sacrificing clarity?');
    }, 120);
  });

  // Integrare cu Service Worker: dacă primim semnal că SW e activat sau există update,
  // re-încercăm să luăm /ticker.json pentru a reflecta conținutul nou.
  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel('sw-updates');
      bc.addEventListener('message', (ev) => {
        if (ev && ev.data && (ev.data.type === 'SW_ACTIVATED' || ev.data.type === 'SW_UPDATED')) {
          loadTickersFromNetwork();
        }
      });
    }
  } catch {}

})();

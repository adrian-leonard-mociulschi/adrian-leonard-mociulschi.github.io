/* ticker.js — Final Optimized Version (Adrian Leonard Mociulschi)
   ✔ No cookies/localStorage
   ✔ Dynamic text for multiple tickers
   ✔ API: setTickerText(), restartTicker(), initTickers()
   ✔ Network-first JSON + SW BroadcastChannel
   ✔ requestAnimationFrame for smooth restart
   ✔ requestIdleCallback for fallback updates
*/

(function(){
  'use strict';

  /** Set text and restart ticker animation */
  function setTickerText(selector, newText){
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;
    const item = el.querySelector('.ticker-item');
    if (!item) return;

    el.classList.remove('is-running');
    item.textContent = (newText || '').trim();

    // Restart using rAF for smoother frame sync
    requestAnimationFrame(() => {
      el.classList.add('is-running');
    });
  }

  /** Restart ticker without changing text */
  function restartTicker(selector){
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;
    el.classList.remove('is-running');
    requestAnimationFrame(() => {
      el.classList.add('is-running');
    });
  }

  /** Initialize all tickers from data-text */
  function initTickers(){
    document.querySelectorAll('.news-ticker').forEach(ticker => {
      const text = ticker.dataset.text?.trim() || '';
      if (text) setTickerText(ticker, text);
      else ticker.classList.add('is-running');
    });
  }

  /** Debounce helper */
  const debounce = (fn, ms) => {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  /** Apply JSON map: { selector: text } */
  const applyTickerMap = map => {
    if (!map || typeof map !== 'object') return;
    Object.entries(map).forEach(([sel, txt]) => setTickerText(sel, txt));
  };

  /** Fetch ticker.json (network-first) */
  const loadTickersFromNetwork = debounce(() => {
    fetch('/ticker.json?v=' + Date.now(), { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(applyTickerMap)
      .catch(err => console.warn('Ticker fetch failed:', err));
  }, 50);

  /** Expose API globally */
  window.setTickerText = setTickerText;
  window.restartTicker = restartTicker;
  window.initTickers = initTickers;

  /** DOM Ready */
  window.addEventListener('DOMContentLoaded', () => {
    initTickers();
    loadTickersFromNetwork();

    // Optional fallback using requestIdleCallback for non-blocking
    const fallbackFn = () => {
      setTickerText('.ticker-red', 'Nov 18: România Liberă – Shadows Over the Black Sea: The silent front where Europe’s future is decided.');
      setTickerText('.ticker-yellow', 'Nov 16: Contributors – Noah’s Ark in the Age of Red Alerts. How do we rebuild trust without sacrificing clarity?');
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(fallbackFn, { timeout: 500 });
    } else {
      setTimeout(fallbackFn, 120);
    }
  });

  /** SW integration via BroadcastChannel */
  if ('BroadcastChannel' in window) {
    const bc = new BroadcastChannel('sw-updates');
    bc.addEventListener('message', ev => {
      if (ev?.data?.type === 'SW_ACTIVATED' || ev?.data?.type === 'SW_UPDATED') {
        loadTickersFromNetwork();
      }
    });
  }
})();

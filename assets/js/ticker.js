/* ticker.js — Cache-Fix Version (Adrian Leonard Mociulschi)
   ✔ No cookies/localStorage
   ✔ Dynamic text for multiple tickers
   ✔ API: setTickerText(), restartTicker(), initTickers(), setTickerSpeed()
   ✔ Network-first JSON + SW BroadcastChannel
   ✔ requestAnimationFrame for smooth restart
   ✔ requestIdleCallback for fallback updates
   ✔ GitHub Pages cache bypass (cache: 'reload' + Cache-Control)
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

  /** Set ticker speed dynamically */
  function setTickerSpeed(selector, duration){
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!el) return;
    el.style.setProperty('--ticker-duration', duration);
    restartTicker(el);
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

  /** Apply JSON map: { selector: text or {text, duration} } */
  const applyTickerMap = map => {
    if (!map || typeof map !== 'object') return;
    Object.entries(map).forEach(([sel, value]) => {
      if (typeof value === 'string') {
        setTickerText(sel, value);
      } else if (value && typeof value === 'object') {
        if (value.text) setTickerText(sel, value.text);
        if (value.duration) setTickerSpeed(sel, value.duration);
      }
    });
  };

  /** Fetch ticker.json (network-first, cache bypass) */
  const loadTickersFromNetwork = debounce(() => {
    fetch('/ticker.json?v=' + Date.now(), {
      cache: 'reload',
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(applyTickerMap)
      .catch(err => console.warn('Ticker fetch failed:', err));
  }, 50);

  /** Expose API globally */
  window.setTickerText = setTickerText;
  window.restartTicker = restartTicker;
  window.initTickers = initTickers;
  window.setTickerSpeed = setTickerSpeed;

  /** DOM Ready */
  window.addEventListener('DOMContentLoaded', () => {
    initTickers();
    loadTickersFromNetwork();

    const fallbackFn = () => {
      setTickerText('.ticker-red', 'Read the editorials written by Adrian Leonard Mociulschi in România Liberă');
      setTickerText('.ticker-yellow', 'Follow the latest articles signed by Adrian Leonard Mociulschi in Contributors');
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

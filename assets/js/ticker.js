// ticker.js — schimbare text + restart animație
function setTickerText(selector, newText) {
  const ticker = document.querySelector(selector);
  if (!ticker) return;
  const item = ticker.querySelector('.ticker-item');
  if (!item) return;

  // oprește animația
  ticker.classList.remove('is-running');

  // setează noul text
  item.textContent = newText;

  // forțează reflow ca să resetăm timeline-ul CSS
  void item.offsetWidth; // magic line: declanșează reflow

  // repornește animația
  ticker.classList.add('is-running');
}

// Exemplu de utilizare:
// setTickerText('.ticker-red', 'Un nou mesaj pentru banda roșie');
// setTickerText('.ticker-yellow', 'Un alt mesaj pentru banda galbenă');

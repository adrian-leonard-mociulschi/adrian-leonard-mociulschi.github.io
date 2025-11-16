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
  void item.offsetWidth;

  // repornește animația
  ticker.classList.add('is-running');
}

// pornește animația la încărcarea paginii
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.news-ticker').forEach(t => t.classList.add('is-running'));

  // setează dinamic mesajul dorit
  setTickerText('.ticker-red', 'Read Opinions & Editorials by Adrian Leonard Mociulschi in România Liberă');
  setTickerText('.ticker-yellow', 'Check out the latest articles by Adrian Leonard Mociulschi in Contributors.ro');
});

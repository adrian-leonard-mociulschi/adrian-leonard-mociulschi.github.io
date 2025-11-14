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
  setTickerText('.ticker-red', '“The sky no longer belongs to birds” — editorial by Adrian Leonard Mociulschi in România Liberă on mountain troops and the algorithmic frontier');
  setTickerText('.ticker-yellow', 'Contributors publishes Adrian Leonard Mociulschi’s editorial: “Vanished Aircraft and the Fragility of Progress” — a reflection on myth, algorithms, and uncertainty');
});

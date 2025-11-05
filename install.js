
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBanner = document.createElement('div');
  installBanner.innerHTML = `
    <div style="position:fixed;bottom:10px;right:10px;background:#000;color:#fff;padding:10px;border-radius:5px;z-index:9999;">
      Install Adrian Leonard Mociulschi — Use this site often?
      <button id="installBtn" style="margin-left:10px;">Install</button>
    </div>
  `;
  document.body.appendChild(installBanner);

  document.getElementById('installBtn').addEventListener('click', () => {
    installBanner.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      deferredPrompt = null;
    });
  });
});

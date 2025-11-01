// === Premium Navigation Hamburger Toggle ===
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.menu-toggle');
  const menuList = document.querySelector('.menu-list');

  if (toggleButton && menuList) {
    toggleButton.addEventListener('click', () => {
      menuList.classList.toggle('open');
    });
  }
});

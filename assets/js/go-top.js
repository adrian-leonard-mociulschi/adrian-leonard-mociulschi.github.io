(function(){
  var btn = document.getElementById('goTop');
  if(!btn) return;

  var showAt = 400;
  function toggle(){
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    btn.classList.toggle('visible', y > showAt);
  }
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  function scrollTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Click event for desktop
  btn.addEventListener('click', scrollTop);

  // Touchend event for iOS fix
  btn.addEventListener('touchend', function(e){
    e.preventDefault(); // Prevent default tap behavior on iOS
    scrollTop();
  });
})();

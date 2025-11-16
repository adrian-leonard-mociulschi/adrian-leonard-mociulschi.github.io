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

  btn.addEventListener('click', scrollTop);
  btn.addEventListener('touchend', function(e){
    e.preventDefault(); // iOS fix
    scrollTop();
  });
})();

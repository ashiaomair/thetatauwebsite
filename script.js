document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        var offset = 70; // header height
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top: top, behavior: 'smooth'});
        // close mobile nav
        document.getElementById('site-nav').classList.remove('open');
      }
    });
  });

  // Hamburger toggle
  var navToggle = document.getElementById('nav-toggle');
  var siteNav = document.getElementById('site-nav');
  var siteHeader = document.getElementById('site-header');
  navToggle.addEventListener('click', function(){
    siteNav.classList.toggle('open');
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', function(){
    if(window.innerWidth > 720) siteNav.classList.remove('open');
  });

  // Change header background on scroll
  function onScroll(){
    var threshold = 20;
    if(window.scrollY > threshold){
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Gallery lightbox
  var thumbs = document.querySelectorAll('.thumb');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbClose = document.getElementById('lb-close');

  thumbs.forEach(function(t){
    t.addEventListener('click', function(){
      var src = this.dataset.full || this.style.backgroundImage.replace(/url\(|\)|\"|\'/g,'');
      lbImg.src = src;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  lbClose.addEventListener('click', function(){
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  });
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) lbClose.click();
  });
});

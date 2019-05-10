var isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

// BURGER MENU BELOW, COMPILED FROM BABEL

var app = (function() {
  var body = void 0;
  var menu = void 0;
  var menuItems = void 0;
  var nav = void 0;

  var init = function init() {
    body = document.querySelector('body');
    menu = document.querySelector('.menu-icon');
    menuItems = document.querySelectorAll('.nav__list-item');
    nav = document.querySelector('.nav_');

    applyListeners();
  };

  var applyListeners = function applyListeners() {
    menu.addEventListener('click', function() {
      return toggleClass(body, 'nav-active');
    });
  };

  var toggleClass = function toggleClass(element, stringClass) {
    if (element.classList.contains(stringClass)) {
      element.classList.remove(stringClass);

      setTimeout(function() {
        nav.style.display = 'none';
      }, 800);
    } else {
      nav.style.display = 'block';
      setTimeout(function() {
        element.classList.add(stringClass);
      }, 200);
    }
  };

  init();
})();

//END BURGER MENU

// hide menu on scroll below

if (!isMobile) {
  var prevScrollpos = window.pageYOffset;
  window.addEventListener('scroll', onScrollMenuHides);
  let logoImg = document.querySelector('#logo img');

  function onScrollMenuHides() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById('header').style.top = '0';
      logoImg.style.transform = 'translate(0, 0)';
      logoImg.style.backgroundColor = 'rgba(255, 255, 255, 0.0)';
    } else {
      logoImg.style.transform = 'translate(-39vw, 25vh)';
      logoImg.style.backgroundColor = 'rgba(255, 255, 255, 0.44)';

      document.getElementById('header').style.top = '-25vh';
    }
    prevScrollpos = currentScrollPos;
  }
}

//end hide menu on scroll

//changing lang below

flag = $('.flag');
englishFlag = document.getElementById('englishFlag');
chineseFlag = document.getElementById('chineseFlag');

flag.click(function() {
  flag.removeClass('active');
  $(this).addClass('active');
});

chineseFlag.addEventListener('click', function() {
  window.location.replace('http://siqiulicontemporaryceramicart.com');
});

////LOADING BAR BELOW

(function() {
  function id(v) {
    return document.getElementById(v);
  }
  function loadbar() {
    var ovrl = id('overlayLoading'),
      prog = id('progress'),
      stat = id('progstat'),
      img = document.images,
      c = 0;
    tot = img.length;

    function imgLoaded() {
      c += 1;
      var perc = (((100 / tot) * c) << 0) + '%';
      prog.style.width = perc;
      stat.innerHTML = 'Loading ' + perc;
      if (c === tot) return doneLoading();
    }
    function doneLoading() {
      ovrl.style.opacity = 0;
      setTimeout(function() {
        ovrl.style.display = 'none';
      }, 1200);
    }
    for (var i = 0; i < tot; i++) {
      var tImg = new Image();
      tImg.onload = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src = img[i].src;
    }
  }

  var myVideo = document.getElementById('myVideo');
  if (myVideo) {
    myVideo.addEventListener('canplaythrough', loadbar, false);
  } else {
    document.addEventListener('DOMContentLoaded', loadbar, false);
  }
})();

////END LOADING BAR

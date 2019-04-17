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

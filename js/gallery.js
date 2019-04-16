// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// Give the parameter a variable name
var dynamicContent = getParameterByName('cat');
//getParameterByName is a function that fetches the id from URL
//the id in URL comes from dynamically set "href" in blog.html through blog.js
//the id set in this URL comes from fetched json file in blog.js

function getAllArtItems() {
  fetch('http://dashboard.siqiuli.com/?rest_route=/wp/v2/art&per_page=100')
    .then(res => res.json())
    .then(showItems)
    .then(applyAnimations);
}

function showItems(data) {
  let list = document.querySelector('.container-gal');
  let template = document.getElementById('art-item-gallery-template').content;
  console.log(data);

  data.forEach(function(theArtItem) {
    let clone = template.cloneNode(true);

    let image = clone.querySelector('.art-item-image');
    let titleTag = clone.querySelector('.underImage');
    let anchorGal = clone.querySelector('.anchorGalItem');

    let titleEnglish = theArtItem.acf.art_piece.images.image1;
    let imageACF = theArtItem.acf.art_piece.chinese_title;
    let category = theArtItem.acf.art_piece.category;

    let titleChinese = theArtItem.title.rendered + '<br>' + imageACF;
    let itemId = theArtItem.id;

    image.setAttribute('src', titleEnglish);
    titleTag.innerHTML = titleChinese;
    anchorGal.setAttribute('href', 'product.html?id=' + itemId);

    if (category == 'ceramic' && dynamicContent == 'ceramic')
      list.appendChild(clone);
    else if (category != 'ceramic' && dynamicContent == 'rice')
      list.appendChild(clone);
  });
}

getAllArtItems();

function applyAnimations() {
  document.querySelectorAll('.content-gal')[0].classList.add('wow-in-view');
  document.querySelectorAll('.content-gal')[1].classList.add('wow-in-view');
}

function isElementInViewport(el) {
  //special bonus for those using jQuery
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight + 600 ||
        document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /*or $(window).width() */
  );
}

function isElementInViewportDesktop(el) {
  //special bonus for those using jQuery
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= -250 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight + 600 ||
        document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /*or $(window).width() */
  );
}

function animateIfInView() {
  if ($(window).width() <= 760) {
    $.each($('.wow'), function(key, value) {
      if (isElementInViewport($(value))) {
        $(value).addClass('wow-in-view');
      } else {
        $(value).removeClass('wow-in-view');
      }
    });
  } else {
    $.each($('.wow'), function(key, value) {
      if (isElementInViewportDesktop($(value))) {
        $(value).addClass('wow-in-view');
      } else {
        $(value).removeClass('wow-in-view');
      }
    });
  }
}

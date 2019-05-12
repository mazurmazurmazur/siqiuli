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
var dynamicContent = getParameterByName('id');
//getParameterByName is a function that fetches the id from URL
//the id in URL comes from dynamically set "href" in blog.html through blog.js
//the id set in this URL comes from fetched json file in blog.js

let paintings = [];
let videosArray = [];

function getAllPaintings() {
  fetch(
    'https://dashboard.siqiuli.com/?rest_route=/wp/v2/art/' + dynamicContent
  )
    .then(res => res.json())
    .then(showPaintings)
    .then(muteVideos)
    .then(placeSize);
}

function showPaintings(data) {
  console.log(data);
  let list = document.querySelector('#wrapper');
  let template = document.querySelector('#paintingTemplate').content;

  // let clone = template.cloneNode(true);
  let images = data.acf.art_piece.images;
  let images2 = data.acf.art_piece.images2;
  let videos = data.acf.art_piece.videos;
  let sizeJson = data.acf.art_piece.size;
  let descJson = data.acf.art_piece.english;
  let titleJson =
    data.title.rendered + '<br><br>' + data.acf.art_piece.chinese_title;

  let title = document.querySelector('.title');
  let sizeP = document.getElementById('size');
  let descHtml = document.getElementById('description');

  let size = document.getElementById('sizeSpan');

  title.innerHTML = titleJson;
  descHtml.innerHTML = descJson;

  if (sizeJson) {
    size.innerHTML = sizeJson;
  } else {
    sizeP.style.display = 'none';
  }

  function putImagesInArray(imgs) {
    for (key in imgs) {
      ///looping through all keys in this product(acf= advanced custom fields)
      if (key) {
        // let clone = template.cloneNode(true);
        let imageTemp = key;
        let photo = imgs[imageTemp];
        if (photo) {
          paintings.push(photo);
        }
      }
    }
  }

  function putVideosInArray(vids) {
    for (key in vids) {
      ///looping through all keys in this product(acf= advanced custom fields)
      if (key) {
        // let clone = template.cloneNode(true);
        let vidTemp = key;
        let video = data.acf.art_piece.videos[vidTemp];
        if (video) {
          videosArray.push(video);
        }
      }
    }
  }

  putImagesInArray(images);
  putVideosInArray(videos);
  putImagesInArray(images2);
  fillColumns();
}

getAllPaintings();

function fillColumns() {
  for (i = 0; i < videosArray.length; i = i + 2) {
    let vidEl = document.createElement('video');
    let srcEl = document.createElement('source');

    if (videosArray[i]) {
      srcEl.src = videosArray[i];
      srcEl.setAttribute('type', 'video/mp4');
      vidEl.setAttribute('controls', true);
      vidEl.setAttribute('autoplay', true);

      vidEl.appendChild(srcEl);
      document.querySelector('#leftImg').appendChild(vidEl);
    }
  }

  for (i = 1; i < videosArray.length; i = i + 2) {
    let vidEl = document.createElement('video');
    let srcEl = document.createElement('source');

    if (videosArray[i]) {
      srcEl.src = videosArray[i];
      srcEl.setAttribute('type', 'video/mp4');
      vidEl.setAttribute('controls', 'true');
      vidEl.setAttribute('autoplay', 'on');
      vidEl.appendChild(srcEl);
      document.querySelector('#rightImg').appendChild(vidEl);
    }
  }

  for (i = 1; i < paintings.length; i = i + 2) {
    var img = document.createElement('img');
    img.src = paintings[i];

    document.querySelector('#rightImg').appendChild(img);
  }

  for (i = 0; i < paintings.length; i = i + 2) {
    var img = document.createElement('img');
    img.src = paintings[i];
    if (i == 0) {
      img.id = 'main-image';
      document.querySelector('#titleImageWrapper').appendChild(img);
    } else {
      document.querySelector('#leftImg').appendChild(img);
    }
  }
}

function placeSize() {
  setTimeout(function() {
    if ($(window).width() > 1024) {
      let tempLeft = $('#main-image').offset().left;
      console.log('tempLeft ' + tempLeft);
      $('#size').css('left', tempLeft / 2);
      if (tempLeft == $(window).width() / 2) {
        placeSize(); ///// RECURSIVE FUNCTION !!!!!!
      }
    }
  }, 500);
}

function muteVideos() {
  $('video').prop('volume', 0.0);
  if (!isMobile) {
    console.log('not mobile!');
    return true;
  }
}

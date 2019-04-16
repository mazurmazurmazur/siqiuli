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

var paintings = [];

function getAllPaintings() {
  fetch('http://dashboard.siqiuli.com/?rest_route=/wp/v2/art/' + dynamicContent)
    .then(res => res.json())
    .then(showPaintings)
    .then(placeSize);
}

function showPaintings(data) {
  console.log(data);
  let list = document.querySelector('#wrapper');
  let template = document.querySelector('#paintingTemplate').content;

  // let clone = template.cloneNode(true);
  let images = data.acf.art_piece.images;
  let images2 = data.acf.art_piece.images2;
  let sizeJson = data.acf.art_piece.size;
  // let descJson = data.acf.art_piece.description;
  let titleJson =
    data.title.rendered + '<br>' + data.acf.art_piece.chinese_title;

  let title = document.querySelector('.title');
  let size = document.getElementById('sizeSpan');
  // let desc = document.getElementById('');

  title.innerHTML = titleJson;

  if (sizeJson != '') size.innerHTML = sizeJson;
  else size.style.visibility = 'hidden';
  function putImagesInArray(imgs) {
    for (key in imgs) {
      ///looping through all keys in this product(acf= advanced custom fields)
      if (key) {
        let clone = template.cloneNode(true);
        let imageTemp = key;
        let photo = data.acf.art_piece.images[imageTemp];
        if (photo) {
          paintings.push(photo);
          list.appendChild(clone);
        }
      }
    }
  }
  putImagesInArray(images);
  putImagesInArray(images2);
  fillColumns();
}

getAllPaintings();

function fillColumns() {
  console.log(paintings.length);
  for (i = 0; i < paintings.length; i = i + 2) {
    var img = document.createElement('img');
    img.src = paintings[i];
    console.log('left' + i);
    if (i == 0) {
      img.id = 'main-image';
      document.querySelector('#titleImageWrapper').appendChild(img);
    } else {
      document.querySelector('#leftImg').appendChild(img);
    }
  }

  for (i = 1; i < paintings.length; i = i + 2) {
    var img = document.createElement('img');
    img.src = paintings[i];
    if (i == 1 || i == 3 || i == 5) {
      console.log('substracted from right to left' + i);
      document.querySelector('#leftImg').appendChild(img);
    }
    document.querySelector('#rightImg').appendChild(img);
  }
}

function placeSize() {
  if (!isMobile) {
    let tempLeft = $('#main-image').offset().left;
    let docLeft = $(document).offset().left;

    $('#size').css('left', tempLeft / 2);
  }
}

// function mobile() {
//   if (isMobile) {
//     let tempHeight;
//     let tempTop;
//     var $img = $('#main-image');

//     $img.on('load', function() {
//       tempHeight = $img.height();
//       tempTop = $(this).offset().top;
//     });
//     console.log(tempHeight);

//     $('.parent').css('margin-top', tempTop);
//   }
// }

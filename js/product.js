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
    .then(showPaintings);
}

function showPaintings(data) {
  console.log(data);
  let list = document.querySelector('#wrapper');
  let template = document.querySelector('#paintingTemplate').content;

  let clone = template.cloneNode(true);
  let images = data.acf.art_piece.images;
  let sizeJson = data.acf.art_piece.size;
  let descJson = data.acf.art_piece.description;
  let titleJson =
    data.title.rendered + '<br>' + data.acf.art_piece.chinese_title;

  let title = document.querySelector('.title');
  let size = document.getElementById('sizeSpan');
  let desc = document.getElementById('');

  title.innerHTML = titleJson;

  if (sizeJson != '') size.innerHTML = sizeJson;
  else size.style.visibility = 'hidden';
  for (key in images) {
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
  fillColumns();
}

getAllPaintings();

function fillColumns() {
  console.log(paintings.length);
  for (i = 0; i < paintings.length; i = i + 2) {
    var img = document.createElement('img');
    img.src = paintings[i];
    console.log(i);
    if (i == 0) {
      img.id = 'main-image';
    }
    img.style.padding = Math.random() * 5 + 'vw';
    document.querySelector('#leftImg').appendChild(img);
  }

  for (i = 1; i < paintings.length; i = i + 2) {
    var img = document.createElement('img');
    img.src = paintings[i];
    img.style.padding = Math.random() * 5 + 'vw';
    document.querySelector('#rightImg').appendChild(img);
  }
}

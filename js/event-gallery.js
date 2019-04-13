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
  fetch(
    'http://dashboard.siqiuli.com/?rest_route=/wp/v2/event/' + dynamicContent
  )
    .then(res => res.json())
    .then(showPaintings);
}

function showPaintings(data) {
  console.log(data);
  let list = document.querySelector('.gallery');
  let template = document.querySelector('.paintingTemplate').content;

  let clone = template.cloneNode(true);
  let images = data.acf.event.english.images;
  let images2 = data.acf.event.english.images2;
  let images3 = data.acf.event.english.images3;

  function pushImages(arrTemp) {
    for (key in arrTemp) {
      ///looping through all keys in this product(acf= advanced custom fields)
      if (key) {
        let clone = template.cloneNode(true);
        let imageTemp = key;
        let photo = arrTemp[imageTemp];
        if (photo) {
          let newDiv = document.createElement('div');
          newDiv.classList.add('gallery-item');
          let newImage = document.createElement('img');
          newImage.classList.add('gallery-image');

          newImage.setAttribute('src', photo);

          newDiv.appendChild(newImage);
          list.appendChild(newDiv);

          console.log('adding image done');
        }
      }
    }
  }

  pushImages(images);
  pushImages(images2);
  pushImages(images3);
}

getAllPaintings();

$(document).ready(function() {
  //Get the modal
  var modal = document.getElementById('imgModal');

  //Get the image
  var img = $('.gallery-image');
  var modalImg = document.getElementById('img01');

  $(document).on('click', '.gallery-image', function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
    modalImg.alt = this.alt;
    console.log('hello');
  });

  var span = document.getElementsByClassName('close')[0];

  //click on (x), close the modal
  span.onclick = function() {
    modal.style.display = 'none';
  };
});

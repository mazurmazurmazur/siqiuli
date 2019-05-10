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

let link;
let tempAlt;
if (dynamicContent == 'siqiuli') {
  link = 'https://dashboard.siqiuli.com/?rest_route=/wp/v2/about/204';
  tempAlt = 'Si Qiuli';
} else if (dynamicContent == 'museum') {
  tempAlt = 'Museum';
  link = 'https://dashboard.siqiuli.com/?rest_route=/wp/v2/about/261';
} else if (dynamicContent == 'ceramic') {
  tempAlt = 'Ceramic Art';
  link = 'https://dashboard.siqiuli.com/?rest_route=/wp/v2/about/260';
}

let images = [];
let list = document.querySelector('#aboutGallery');

function fetchAbout(link_) {
  fetch(link_) //only one entry in json file (WP REST)
    .then(res => res.json())
    .then(showAbout)
    .then(boldNav);
}

function showAbout(json) {
  console.log(json);
  let acf = json.acf;

  let imageDesktop = document.getElementById('aboutImageDesktop'); //selecting DOM elements
  let imageMobile = document.getElementById('aboutImageMobile');
  let aboutText = document.getElementById('textAbout');

  let jsonText = acf.about_text;
  let image = acf.about_images.image1.sizes.medium_large;
  images = acf.about_images;

  imageDesktop.setAttribute('src', image);
  imageDesktop.setAttribute('alt', tempAlt);

  // imageMobile.setAttribute('src', image);

  jsonText = jsonText.replace(
    '<p>',
    '<p><img id="aboutImageMobile" class="noDesktop" src="' + image + '">'
  ); ///adding image to text, in order for it to float in it

  aboutText.innerHTML = jsonText;

  pushImages(images);
}

function pushImages(arrTemp) {
  for (key in arrTemp) {
    ///looping through all keys in this product(acf= advanced custom fields)
    if (key && key != 'image1') {
      let photo = arrTemp[key].sizes.medium_large;
      if (photo) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('gallery-item');
        let newImage = document.createElement('img');
        newImage.classList.add('gallery-image');

        newImage.setAttribute('src', photo);

        newDiv.appendChild(newImage);
        list.appendChild(newDiv);
      }
    }
  }
}

function boldNav() {
  if (dynamicContent == 'siqiuli') {
    document.querySelector('#aboutSi a').style.fontWeight = '500';
  } else if (dynamicContent == 'museum') {
    document.querySelector('#aboutMu a').style.fontWeight = '500';
  } else if (dynamicContent == 'ceramic') {
    document.querySelector('#aboutCe a').style.fontWeight = '500';
  }
}
fetchAbout(link);

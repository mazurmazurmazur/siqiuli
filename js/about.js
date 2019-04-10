function fetchAbout() {
  fetch('http://dashboard.siqiuli.com/?rest_route=/wp/v2/about/204') //only one entry in json file (WP REST)
    .then(res => res.json())
    .then(showAbout);
}
function showAbout(json) {
  console.log(json); //shows json file in console, makes development much easier
  let acf = json.acf;

  let imageDesktop = document.getElementById('aboutImageDesktop'); //selecting DOM elements
  let imageMobile = document.getElementById('aboutImageMobile');
  let aboutText = document.getElementById('textAbout');

  let jsonText = acf.about_text;
  let image = acf.about_images.image1.sizes.medium_large;

  imageDesktop.setAttribute('src', image);
  imageMobile.setAttribute('src', image);
  aboutText.innerHTML = jsonText;
}

fetchAbout();

function fetchIndex() {
  fetch('https://dashboard.siqiuli.com/?rest_route=/wp/v2/main_page/760') //only one entry in json file (WP REST)
    .then(res => res.json())
    .then(showIndex);
}

function showIndex(json) {
  console.log(json);
  let acf = json.acf;

  let titleOverlay = document.getElementById('titleOverlay'); //selecting DOM elements
  let divOverlay = document.querySelector('.content');
  let titleMain = document.getElementById('mainTextHeader');
  let divMain = document.getElementById('mainPageDesc');

  let jsonTextOverlay = acf.text_overflow;
  let jsonTitleOverlay = acf.title_overflow;
  let jsonTextMain = acf.text_main;
  let jsonTitleMain = acf.title_main;

  titleOverlay.innerHTML = jsonTitleOverlay;
  divMain.innerHTML = `<h1 id="mainTextHeader">` + jsonTitleMain + '</h1>';
  divOverlay.innerHTML += jsonTextOverlay;
  divMain.innerHTML += jsonTextMain;
}

fetchIndex();

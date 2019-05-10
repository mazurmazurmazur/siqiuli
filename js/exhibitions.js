let imagesArr = [];
let detsArr = [];

function getAllArtItems() {
  fetch('https://dashboard.siqiuli.com/?rest_route=/wp/v2/event&per_page=100')
    .then(res => res.json())
    .then(showItems)
    .then(applyExhAnim)
    .then(fakeClickStart);
}

function showItems(data) {
  let list = document.querySelector('#listMenu');
  let listImage = document.querySelector('.mainPainting');
  let templateTitle = document.querySelector('.templateTitle').content;
  // let templateImage = document.querySelector('.templateImage').content;
  console.log(data);

  let i = 0;
  data.forEach(function(theEvent) {
    let clone = templateTitle.cloneNode(true);
    // let cloneImage = templateImage.cloneNode(true);

    let image = document.querySelector('.eventImg');
    let titleTag = clone.querySelector('.aa');

    let image1 = theEvent.acf.event.english.images.image1;
    let yearJson = theEvent.acf.event.year;
    let titleJson = theEvent.title.rendered;
    let itemId = theEvent.id;

    console.log(image1);

    titleTag.id = 'a' + i;

    image.setAttribute('src', image1);
    imagesArr.push(image1);
    detsArr.push(itemId);

    titleTag.innerHTML = '<span>' + yearJson + ' </span>' + titleJson;

    list.appendChild(clone);

    i++;
  });
}

getAllArtItems();

function applyExhAnim() {
  let menuItems = $('.aa');

  $('.aa').click(function() {
    let distanceFromTop = $(this).offset().top;
    let halfPageHeight = $(document).height() / 2;
    let listMenu = $('#listMenu');
    let menuFromTop = listMenu.offset().top;

    listMenu.css('top', menuFromTop + (halfPageHeight - distanceFromTop));

    menuItems.css({ 'font-size': '10px', 'font-weight': '100' });

    if (window.matchMedia('(max-width: 767px)').matches)
      $(this).css('font-size', '15px');
    else $(this).css({ 'font-size': '1.2vw', 'font-weight': '300' });

    let mainDiv = $('.mainPainting');

    let mainPainting = $('.mainPainting div img');

    let arrNr = this.id.split('a').pop();

    mainPainting.css('opacity', 0);
    setTimeout(function() {
      mainPainting.attr('src', imagesArr[arrNr]);
      mainDiv.attr('onclick', 'redir(' + detsArr[arrNr] + ')');

      mainPainting.css('opacity', 1);
    }, 500);

    $('.aa').hover(
      function() {
        $(this)
          .find('span')
          .css('text-decoration', 'underline');
      },
      function() {
        $('span').css('text-decoration', 'none');
      }
    );
  });
}

function fakeClickStart() {
  $('.aa').trigger('click');
}

function redir(link) {
  window.open('event-gallery.html?id=' + link, '_self');
}

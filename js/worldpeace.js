$(document).ready(function() {
  var isMobile = window.matchMedia('only screen and (max-width: 760px)')
    .matches;
  let wrapper = $('#listMenu');
  let menuItems = $('.aa');

  $('.aa').click(function() {
    let distanceFromTop = $(this).offset().top;
    let halfPageHeight = $(document).height() / 2;
    let listMenu = $('#listMenu');
    let menuFromTop = listMenu.offset().top;

    listMenu.css('top', menuFromTop + (halfPageHeight - distanceFromTop));

    menuItems.css('font-size', '10px');
    if (isMobile) {
      $(this).css('font-size', '20px');
    }
    $(this).css('font-size', '30px');

    let mainPainting = $('.mainPainting img');

    if (this.id == 'a1') {
      mainPainting.css('opacity', 0);
      setTimeout(function() {
        mainPainting.attr(
          'src',
          'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/48380733_275157829849588_4839849730756313088_o.jpg?_nc_cat=107&_nc_ht=scontent-waw1-1.xx&oh=9c0799e6d087922f415f2616b00dcce4&oe=5CD823FE'
        );

        mainPainting.css('opacity', 1);
      }, 500);
    } else if (this.id == 'a2') {
      mainPainting.css('opacity', 0);
      setTimeout(function() {
        mainPainting.attr(
          'src',
          'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/49128205_280166436015394_889124377063325696_o.jpg?_nc_cat=102&_nc_ht=scontent-waw1-1.xx&oh=ce57cb0c9610d831fff3d17fcd8b66c8&oe=5CCBD857'
        );

        mainPainting.css('opacity', 1);
      }, 1000);
    } else if (this.id != 'a1' && this.id != 'a2') {
      mainPainting.css('opacity', 0);
      setTimeout(function() {
        mainPainting.attr(
          'src',
          'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/48380733_275157829849588_4839849730756313088_o.jpg?_nc_cat=107&_nc_ht=scontent-waw1-1.xx&oh=9c0799e6d087922f415f2616b00dcce4&oe=5CD823FE'
        );

        mainPainting.css('opacity', 1);
      }, 1000);
    }
  });

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

$(document).ready(function () {


  $(window).resize(function(e){

    const comElem = $('.command__elem.active');
    comElem.removeClass('active');
    const h_cart = comElem.find('.command__cart');
    h_cart.height(0); 

  })

  let e_command = new Event("click");
  document.querySelector('.command__elem:last-child').dispatchEvent(e_command);

  var slider = $('.slider').bxSlider({
    wrapperClass: 'products-section',
    pager: false,
    controls: false,
  })

  $('.products__arrow-prev').click(function (e) {
    e.preventDefault();
    slider.goToNextSlide();
    return false;
  });

  $('.products__arrow-next').click(function (e) {
    e.preventDefault();
    slider.goToPrevSlide();
    return false;
  });


});
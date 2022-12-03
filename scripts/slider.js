$(document).ready(function () {

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
$(document).ready(function(){
    
    var slider = $('.slider').bxSlider({
        wrapperClass:'products-section',
        pager:false,
        controls:false
    })

    $('.products__arrow-prev').click(function(e){
        e.preventDefault();
        slider.goToNextSlide();
        return false;
      });
  
    $('.products__arrow-next').click(function(e){
        e.preventDefault();
        slider.goToPrevSlide();
        return false;
      });


});
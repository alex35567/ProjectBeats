$('.colors-section').on('click', function (e) {
    e.preventDefault();
    if (this == e.target) {
        if ($('.colors__cart--active').length > 0) {
            $('.colors-title').toggleClass('colors-title--active');
        }
        $('.colors__cart--active').removeClass('colors__cart--active');

    }
});


$('.colors__elem-title').on('click', function (e) {
    e.preventDefault();

    const cart = $(this).siblings('.colors__cart');
    const parent = cart.closest('.colors__elem');
    //закрываем все открытые карточки, кроме выбранной    
    parent.siblings().find('.colors__cart--active').removeClass('colors__cart--active');

    cart.toggleClass('colors__cart--active');

    $('.colors-title').removeClass('colors-title--active');
    $('.colors-title-menu').addClass('colors-title--active');

    if ($(window).width() <= 480) {        
        parent.toggleClass('colors__elem--active');
        // cart.find('.colors__desc').width($(window).width()-171);
        cart.find('.colors__desc').css('width',($(window).width()-90+'px'));            
    }

    if ($('.colors__cart--active').length == 0) {
        $('.colors-title').toggleClass('colors-title--active');
    }

});

$('.colors-section').on('click', function (e) {
    e.preventDefault();
    if (this == e.target) {
        if ($('.colors__cart--active').length>0) {
            $('.colors-title').toggleClass('colors-title--active');
        }
        $('.colors__cart--active').removeClass('colors__cart--active');

    }
});


$('.colors__elem-title').on('click', function (e) {
    e.preventDefault();

    const cart = $(this).siblings('.colors__cart');
    const parent = cart.closest('.colors__elem');
    parent.siblings().find('.colors__cart--active').removeClass('colors__cart--active');

    cart.toggleClass('colors__cart--active');

    $('.colors-title').removeClass('colors-title--active');
    $('#menu').addClass('colors-title--active');

    if ($('.colors__cart--active').length == 0) {
        $('.colors-title').toggleClass('colors-title--active');
    }

});

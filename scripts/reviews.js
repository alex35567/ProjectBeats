
$('.interactive-avatar').on('click', function (e) {
    e.preventDefault();
    $(this).addClass('interactive-avatar--active');

    $('.interactive-avatar').each((ind, item) => {
        if (item != this) {
            $(item).removeClass('interactive-avatar--active');
        } else {
            // console.log(ind);
            let col_revdispl = $('.reviews__display-inner');            
            col_revdispl.eq(ind).addClass('active').siblings().removeClass('active');
        }
    });
    // debugger;
});
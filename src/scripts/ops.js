const sections = $('section');
const display = $('.main');
const opsBody = document.body;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let scrolling = false;


sections.first().addClass('active');

function changeFixedTheme(sectionEq) {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr('fixed-menu-theme');
    const fixMenu = $('.fixed-menu');

    if (menuTheme === 'light') {
        fixMenu.addClass('fixed-menu--light');
    } else {
        fixMenu.removeClass('fixed-menu--light');
    }
}

function resetActiveClass(items, itemEq, activeClass) {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}


function performTransition(sectionEq) {

    if (scrolling || opsBody.style.overflow.includes('hidden')) return;
        scrolling = true;

        const pos = sectionEq * -100;
        if (isNaN(pos)) pos = 0;

        changeFixedTheme(sectionEq);

        display.css({
            transform: `translateY(${pos}%)`
        })

        $('.modal__overlay').css({
            transform: `translateY(${-pos}%)`
        })

        resetActiveClass(sections, sectionEq, 'active');

        setTimeout(() => {
            scrolling = false;

            resetActiveClass($('.fixed-menu').find('.fixed-menu__item'), sectionEq, 'fixed-menu__item--active');

        }, 500);
    
}

function scrollVport(dir) {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (dir === 'next' && nextSection.length) {
        performTransition(nextSection.index());
    }

    if (dir === 'prev' && prevSection.length) {
        performTransition(prevSection.index());
    }
}

$('[data-scroll-to]').click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
})

$(window).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName != 'input' && tagName != 'textarea') {
        switch (e.keyCode) {
            case 38: //up
                scrollVport('prev');
                break;

            case 40: //down
                scrollVport('next');
                break;

        }
    }
});


$('.wrapper').on('touchmove', e => e.preventDefault());

$(window).on('wheel', function (e) {
    const deltaY = e.originalEvent.deltaY;
    if (deltaY > 0) {
        scrollVport('next');
    }

    if (deltaY < 0) {
        scrollVport('prev');
    }
})


if (isMobile) {

    // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    $(".body").swipe({
        //Generic swipe handler for all directions
        swipe: function (event, direction) {
            const scroller = scrollVport();
            let scrollDir = '';

            if (direction == 'up') scrollDir = "next";
            if (direction == 'down') scrollDir = "prev";
            // console.log(direction);
            scrollVport(scrollDir);
            //scroller[scrollDir]();
        }
    });
}
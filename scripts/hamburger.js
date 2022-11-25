
const hamb_btn = document.querySelector('.hamburger');
const hamb_elems = Array.from(document.getElementsByClassName('hamburger__plank'));
const header_menu = document.querySelector('.header__menu');

hamb_btn.addEventListener('click', function(e){
    e.preventDefault();

    hamb_elems.forEach(function(elem,i){
        elem.classList.toggle('plank-'+(i+1).toString());
    });  
    header_menu.classList.toggle('active'); 

});


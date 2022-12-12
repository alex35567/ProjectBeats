
const hamb_btn = document.querySelector('.hamburger');
const hamb_elems = Array.from(document.getElementsByClassName('hamburger__plank'));
const header_menu = document.querySelector('.header__menu');
const body = document.querySelector('body');


function show_hamburger(){
    // делаем крестик
    hamb_elems.forEach(function(elem,i){        
        elem.classList.toggle('plank-'+(i+1).toString());
    });  

    //показвает меню
    header_menu.classList.toggle('active'); 

    //блокировка прокрутки 
    if (body.style.overflow.includes('hidden')){
        body.style.overflow = 'scroll';
   } else {
       body.style.overflow = 'hidden';
   }
}


hamb_btn.addEventListener('click', function(e){
    e.preventDefault();

    show_hamburger();

});


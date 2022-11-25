
const drpInf_btn = document.querySelector('.product__properties');
const drpInf_menu = document.querySelector('.drop-info');
const drpInf_body = document.querySelector('body');



drpInf_btn.onmouseover = function(event) {
    var target = event.target;

    drpInf_menu.style.top=drpInf_btn.offsetTop+'px';
    drpInf_menu.style.left=(drpInf_btn.offsetWidth+drpInf_btn.offsetLeft)+'px';

    //показвает меню
    drpInf_menu.classList.toggle('active');     

  };
  
drpInf_btn.onmouseout = function(event) {
    var target = event.target;
    drpInf_menu.classList.toggle('active');     
  };


drpInf_btn.addEventListener('click', function(e){
    e.preventDefault();
    
    // drpInf_menu.style.top=drpInf_btn.offsetTop+'px';
    // drpInf_menu.style.left=(drpInf_btn.offsetWidth+drpInf_btn.offsetLeft)+'px';

    // //показвает меню
    // drpInf_menu.classList.toggle('active');     

});



const drpInf_btn = document.querySelector('.product__properties');
const drpInf_menu = document.querySelector('.drop-info');
const drpInf_body = document.querySelector('body');



drpInf_btn.addEventListener('mouseenter' , function(event) {
    let target = event.target;

    drpInf_menu.style.top=drpInf_btn.offsetTop+'px';
    drpInf_menu.style.left=(drpInf_btn.offsetWidth+drpInf_btn.offsetLeft)+'px';
    //показвает меню
    drpInf_menu.classList.toggle('active');     
  });
  
 drpInf_btn.addEventListener('mouseleave' , function(event) {  
    let targetclName = event.target.className;
    console.log(targetclName);
         drpInf_menu.classList.toggle('active');              
         drpInf_menu.style.left='10000px';
  });



  drpInf_menu.addEventListener('mouseenter' , function(event) {
    let target = event.target;    

    let targetclName = event.target.className;
    console.log("enter_menu "+targetclName+" ");
    
        drpInf_menu.style.top=drpInf_btn.offsetTop+'px';
        drpInf_menu.style.left=(drpInf_btn.offsetWidth+drpInf_btn.offsetLeft)+'px';
        //показвает меню    
        drpInf_menu.classList.toggle('active');     
  
  });
  
  drpInf_menu.addEventListener('mouseleave' , function(event) {  

    let targetclName = event.target.className;  
        
         drpInf_menu.classList.toggle('active');     
         console.log("leave_menu "+targetclName+" ");         
         drpInf_menu.style.left='10000px';
  });



drpInf_btn.addEventListener('click', function(e){
    e.preventDefault();

});



$('.command__elem').on('click',function(e){
    e.preventDefault();
    $(this).toggleClass('active'); 

    let job_title = $(this).find('.command__job-title');
    let desc = $(this).find('.command__desc');
    let h_cart = $(this).find('.command__cart');

    //toggleCss
    if (h_cart.height()>0) {h_cart.height(0);}
    else {h_cart.height(job_title.outerHeight(true)+desc.outerHeight(true))};

    //удаляем класс с соседних элементов
    $('.command__elem').each((ind, item)=>{
        if(item!=this){
            $(item).removeClass('active');
            $(item).find('.command__cart').height(0);
        } 
    });
});
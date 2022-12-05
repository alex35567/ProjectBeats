$('#submit').on('click', function (e) {
    e.preventDefault();
    if ($(this).is(e.target)) {
        const form = $('.form');
        const name = form.find("[name='name']");
        const phone = form.find("[name='tel']");
        const comment = form.find("[name='comment']");
        const to = "alex35567@rambler.ru";

        [name, phone, comment].forEach(field => {
            field.removeClass('form__input--error');
            if (field.val().trim() == "") {
                field.addClass('form__input--error');
            }
        })

        let tel = phone.val();
        tel = tel.replace('(', ''); tel = tel.replace(')', ''); tel = tel.replace('-', ''); tel = tel.replace('+7', '8');
        let res = tel.match(/\D/g);
        if (res != null) { phone.addClass('form__input--error'); }

        if (form.find('.form__input--error').length == 0) {
            $.ajax({
                url: "https://webdev-api.loftschool.com/sendmail",
                method: 'post',
                data: {
                    name: name.val(),
                    phone: tel,
                    comment: comment.val(),
                    to: to
                },
                success: data => {
                    modal(this, data.message)
                },
                error: data => {
                    modal(this, 'Ошибка сервера, повторите заказ')
                }
            })
        } else {
            modal(this, 'Заполните обязательные поля!')
        }

    }
});


function modal(selector, text) {

    let overlay = null;
    let newItem = null;

    overlay = document.createElement('div');
    selector.appendChild(overlay);
    overlay.classList.add('modal__overlay');

    overlay.addEventListener('click', function (e) {
        if (e.target == overlay){
            body.style.overflow = 'scroll';
            overlay.remove();
        }
    })
    newItem = document.createElement('div');
    // selector.appendChild(newItem);        
    overlay.appendChild(newItem);
    newItem.classList.add('modal');
    // newItem.textContent = text;
    ItemText = document.createElement('p');
    ItemText.classList.add('modal__text');
    ItemText.textContent = text;
    newItem.appendChild(ItemText);

    let left_modal = (document.documentElement.clientWidth / 2 - newItem.offsetWidth / 2) / document.documentElement.clientWidth * 100;
    let top_modal = (document.documentElement.clientHeight / 2 - newItem.offsetHeight / 2) / document.documentElement.clientHeight * 100;

    newItem.style.left = left_modal + '%';
    newItem.style.top = top_modal + '%';

    const newItem_x = document.createElement('a');
    newItem_x.classList.add('modal__btn');
    newItem_x.classList.add('btn');
    newItem_x.classList.add('btn--theme-primary');

    // newItem_x.style.position="relative";
    newItem_x.textContent = 'Закрыть';
    newItem.appendChild(newItem_x);
    newItem_x.addEventListener('click', function (event) {
        event.preventDefault();
        // selector.removeChild(overlay);  
        body.style.overflow = 'scroll';
        overlay.remove();
        // selector.removeChild(newItem); 
    });

    //блокировка прокрутки 
        body.style.overflow = 'hidden';


}



let password = document.querySelector('.password');
let closeImg = document.querySelector('.close-img');

closeImg.addEventListener('click', function () {
    if (password.type == 'password') {
        password.type = 'text';
        closeImg.src = "./img/eye-open.png";
    } else {
        password.type = 'password';
        closeImg.src = "./img/eye-close.png";
    }
})



const allDomains = ['google', 'yandex', 'mail']
function validation(form) {



    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;

        parent.classList.add('error');

        parent.append(errorLabel);
    }


    let result = true;

    const allInputs = form.querySelectorAll('input');

    // const domains = ['mail.ru', 'yandex.ru', 'gmail.com'];
    const numbers = /[0-9]/;
    const lowerCase = /[a-zа-я]+/g;
    const upperCase = /[A-ZА-Я]+/g;



    for (const input of allInputs) {

        removeError(input);

        if (input.dataset.minLength) {

            if (input.value.length < input.dataset.minLength) {
                removeError(input);
                createError(input, `Минимальное кол-во символов: ${input.dataset.minLength}`);
                result = false;
            }
        }
        if (input.dataset.maxLength) {

            if (input.value.length > input.dataset.maxLength) {
                removeError(input);
                createError(input, `Максимальное кол-во символов: ${input.dataset.maxLength}`);
                result = false;
            }
        }

        if (input.dataset.required == "true") {

            if (input.value == '') {
                removeError(input);
                createError(input, 'Поле не заполнено!');
                result = false;
            }
        }

        if (input.dataset.type) {
            if (!input.value.includes('@')) {
                // removeError(input);
                createError(input, 'Введен некорретный адрес почты');
                result = false;
            } else {
                const domain = input.value.split('@')[1].split('.')[0];
                console.log(domain);
                if (!allDomains.includes(domain)) {
                    createError(input, 'Не допустимый домен почты');
                    result = false;
                }
            }
        }

        if (input.dataset.password == 'password') {
            if (input.value.length < 8) {
                removeError(input);
                createError(input, 'Минимальное количество символов 8');
                result = false;
            }
            if (!input.value.match(numbers)) {
                removeError(input);
                createError(input, 'В пароле должен быть хотя бы один символ от 0 до 9');
                result = false;
            }
            if (!input.value.match(lowerCase)) {
                removeError(input);
                createError(input, 'Отсутствует строчая буква');
                result = false;
            }
            if (!input.value.match(upperCase)) {
                removeError(input);
                createError(input, 'Отсутствует заглавная буква');
                result = false;
            }
            if (input.value.length == 5) {
                removeError(input);
                createError(input, 'Легкий пароль');
                result = false;
            }
            if (input.value.length >= 6) {
                removeError(input);
                createError(input, 'Средний по надежности пароль');
                result = false;
            }
            if (input.value.length >= 9) {
                removeError(input);
                createError(input, 'Надежный пароль');
                result = false;
            }
        }

    }

    return result;
}



document.querySelector('#add-form').addEventListener('submit', function (event) {
    event.preventDefault();

    if (validation(this) == true) {
        alert('Форма проверена успешно!');
    }
});


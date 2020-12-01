const phoneInput = document.querySelector('#callback-form-tel-input');
const nameInput = document.querySelector('#callback-form-name-input');
const emailInput = document.querySelector('#callback-form-email-input');

const callBackForm = document.querySelector('#callback-form');
const requestRecievedModal = document.querySelector('#request-received');

const DEFAULT_PHONE = '+380';

callBackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let oneFieldNotValid = false;

    if (!isPhoneValid(phoneInput.value.trim())) {
        phoneInput.classList.add('input-error-border');
        oneFieldNotValid = true;
    }

    if (!isEmailValid(emailInput.value.trim())) {
        emailInput.classList.add('input-error-border');
        oneFieldNotValid = true;
    }

    if (!nameInput.value.trim()) {
        nameInput.classList.add('input-error-border');
        oneFieldNotValid = true;
    }

    if (oneFieldNotValid) {
        return;
    }

    requestRecievedModal.classList.add('modal-active');
    phoneInput.value = '';
    emailInput.value = '';
    nameInput.value = '';
})

phoneInput.addEventListener('click', function(event){
    const element = event.target; 

    if (!element.value || !element.value.trim()) {
        element.value = DEFAULT_PHONE;
    }
});

phoneInput.addEventListener('blur', function(event){
    const element = event.target; 

    if (element.value.trim() === DEFAULT_PHONE) {
        element.classList.add('input-error-border');
        return;
    }

    element.classList.remove('input-error-border');
});


phoneInput.addEventListener('change', function(event){
    const element = event.target; 

    if (!isPhoneValid(element.value.trim())) {
        element.classList.add('input-error-border');
        return;
    }

    element.classList.remove('input-error-border');

})

emailInput.addEventListener('change', function(event){
    const element = event.target; 

    if (!isEmailValid(element.value.trim())) {
        element.classList.add('input-error-border');
        return;
    }

    element.classList.remove('input-error-border');

})

nameInput.addEventListener('change', function(event){
    const element = event.target; 

    if (!element.value.trim()) {
        element.classList.add('input-error-border');
        return;
    }

    element.classList.remove('input-error-border');
})


function isPhoneValid(phone = '') {
    const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

    return phone.match(regexp);
}

function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
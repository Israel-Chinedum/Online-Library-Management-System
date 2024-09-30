const showPass = document.querySelector('.fa-eye-slash');
const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.input');
const email = document.getElementsByName('Email')[0];
const message = document.querySelector('#message');

showPass.addEventListener('click', () =>{
    if(showPass.classList.contains('fa-eye')){
        showPass.classList.remove('fa-eye');
        showPass.classList.add('fa-eye-slash');
        document.querySelector('#password').setAttribute('type', 'password')
    } else{
        showPass.classList.remove('fa-eye-slash');
        showPass.classList.add('fa-eye');
        document.querySelector('#password').removeAttribute('type', 'password')
    }
});




class Validate{

    filled(fields){

        let isFilled = true;

        fields.forEach(field =>{

            if(field.value == ''){
                isFilled = false;
            }


        });

        return isFilled;
    }

    email(Email){
        if(Email.value.includes('@')){
            return true
        }
    }

    errMess(element, display, mess){

        element.style.display = display;
        element.textContent = mess;

        setTimeout(()=>{
            element.style.display = 'none';
        }, 3000);

    }


} const validate = new Validate();



form.addEventListener('submit', (e) =>{
    e.preventDefault();

    if(validate.filled(inputs) == false){
        validate.errMess(message, 'block', 'Completely fill the form!');
        return;
    } 

    if(validate.email(email) != true){
        validate.errMess(message, 'block', 'Invalid email address!');
        return
    }

    console.log(form);
    document.querySelector('#load-page').style.display = 'flex';
    form.submit();
});


window.addEventListener('load', () => {
    if(message.textContent != ''){
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000)
    }
});
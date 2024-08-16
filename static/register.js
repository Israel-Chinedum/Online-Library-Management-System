const dataDiv = document.querySelector('#data-div');
const inputs = document.querySelectorAll('.input');
const regBtn = document.querySelector('#reg-btn');
const message = document.querySelector('#message');
const email = document.getElementsByName('Email')[0];
const uploadContainer = document.querySelector('#upload-container');
const profileDisplay = document.querySelector('#profile-img');
const profileImg = document.getElementsByName('ProfileImg')[0];
const finishBtn = document.querySelector('#finish-btn');
const form = document.querySelector('#form');


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
        element.innerHTML = mess;

        setTimeout(()=>{
            element.style.display = 'none';
        }, 3000);

    }


} const validate = new Validate();



// EVENT LISTENER FOR THE WHEN THE SUBMIT BUTTON IS CLICKED
    regBtn.addEventListener('click', (e) =>{

    // EVENT HANDLER FOR WHEN THE SUBMIT BUTTON IS CLICKED

    e.preventDefault();

    // FORM VALIDATION CODE FOR VALIDATING THE REGISTRATION FORM
    if(validate.filled(inputs) == false){
        validate.errMess(message, 'block', 'Completely fill the form!');
        return;
    } 

    if(validate.email(email) != true){
        validate.errMess(message, 'block', 'Invalid email address!');
        return
    }

    dataDiv.style.display = 'none';
    uploadContainer.style.display = 'flex';

});


// EVENT LISTENER FOR WHEN AN IMAGE IS SELECTED ON THE "uploadImage" PAGE
profileImg.addEventListener('change', async() =>{

    const file = profileImg.files[0];
    const formData = new FormData();
    formData.append('ProfileImg', file);

        document.querySelector('#load-page').style.display = 'flex';

   fetch('uploadImage', {
    method: 'post',
    body: formData
   }).then(res => res.blob()).then(data => {
    
    console.log(data);

    profileDisplay.src = URL.createObjectURL(data);

    document.querySelector('#load-page').style.display = 'none';

});

});

finishBtn.addEventListener('click', async(e) =>{
    e.preventDefault();
    console.log(form)
    form.submit();
});



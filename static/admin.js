const dbBtn = document.querySelector('#dashboard-btn');
const userBtn = document.querySelector('#user-management-btn');
const caBtn = document.querySelector('#card-allocation-btn');
const dashboard = document.querySelector('#dashboard');
const adminUsers = document.querySelector('#admin-users');
const cardAllocation = document.querySelector('#card-allocation');
const section = document.querySelector('#section');
const userList = document.querySelector('#user-list');
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-btn');
const form = document.querySelector('#form');
const totalUsers = document.querySelector('#total-users .number');
const profileName = document.querySelector('#profile-name');
const profile = document.querySelector('#profile');
const profileImg = document.querySelector('#profile img');
let myArr = [];
let adminList = [];




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


const displaySections = (e) => {
    
    switch(e.target.innerHTML){
        case 'Dashboard':
            adminUsers.style.display = 'none';
            cardAllocation.style.display = 'none';
            dashboard.style.display = 'grid';
            section.innerHTML = e.target.innerHTML;
            break;
        case 'Admin Users':
            dashboard.style.display = 'none';
            cardAllocation.style.display = 'none';
            adminUsers.style.display = 'block';
            section.innerHTML = e.target.innerHTML;
            break;
        case 'Card Allocation':
            dashboard.style.display = 'none';
            adminUsers.style.display = 'none';
            cardAllocation.style.display = 'grid';
            section.innerHTML = e.target.innerHTML;
    }
}

userBtn.addEventListener('click', (e) =>{
        displaySections(e);
});

dbBtn.addEventListener('click', (e) => {
    displaySections(e);
});

caBtn.addEventListener('click', (e) => {
    displaySections(e);
});

window.addEventListener('load', () => {
    fetch('/user-data').then(res => res.json())
    .then(data => {
        let signin = 0;
        let signout = 0;
        myArr = [...data];
        console.log(data);
        for(let i of data){
            const buff = new Uint8Array(atob(i.File.buffer).split('').map(char => char.charCodeAt(0)));
            const url = URL.createObjectURL(new Blob([buff], {type: 'image/jpeg'}));
            userList.innerHTML += `
            <div class="user">
                <div>
                    <img src="${url}" alt="">
                    <p id="user-name">${i.Data['FirstName']} ${i.Data.LastName}</p>
                </div>
                <p id="identification" style="display:none">${i.IdNumber}</p>
                <button id="user-list-vb">View details</button>
            </div>
          `
          if(i.status == true){
            signin++;
          } else{
            signout++;
          }
        }

        totalUsers.innerHTML = data.length;
        document.querySelector('#total-signout .number').textContent = signout;
        document.querySelector('#total-signedin-users .number').textContent = signin;

    });

    fetch('/admin-users').then(res => res.json()).then(data => {
        
        document.querySelector('#total-members .number').innerHTML = data.length;

        adminList = [...data];

        for(let i of data){

            const buffer = new Uint8Array(atob(i.pic).split('').map(char => char.charCodeAt(0)));
            const url = URL.createObjectURL(new Blob([buffer], {type: 'image/jpeg'}));

            adminUsers.innerHTML += `
                                    <div class="admin-user">
                                    <div>
                                        <img src="${url}" alt="">
                                        <p class="admin-user-name">${i.userName}</p>
                                    </div>
                                    <button id="admin-list-vb">View details</button>
                                    
                                    </div>
                                    `
        }
    });

});



//-----SEARCH ENGINE-----
searchBox.addEventListener('keyup', () => {

    const users = document.querySelectorAll('.user #user-name');

    // users.forEach(user => {
    //     if(user.innerHTML.toLowerCase().indexOf(searchBox.value.toLowerCase()) <= -1){
    //         user.parentElement.parentElement.style.display = 'none'
    //     } else{
    //         user.parentElement.parentElement.style.display = 'flex'
    //     }
    //     });
    //}

    if(searchBox.value == ''){
        userList.innerHTML = ''
        for(let i of myArr){
            const buff = new Uint8Array(atob(i.File.buffer).split('').map(char => char.charCodeAt(0)));
            const url = URL.createObjectURL(new Blob([buff], {type: 'image/jpeg'}));
            userList.innerHTML += `
            <div class="user">
                <div>
                    <img src="${url}" alt="">
                    <p id="user-name">${i.Data['FirstName']} ${i.Data.LastName}</p>
                </div>
                <button id="user-list-vb">View details</button>
            </div>
          `
        }
    }

});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(searchBox.value != ''){
        userList.innerHTML = `<h1 id="nothing" style="color: grey">THIS ID DOES NOT EXIST!</h1>`
        for(let i of myArr){
            if(searchBox.value.toUpperCase() == i.IdNumber){
                const buff = new Uint8Array(atob(i.File.buffer).split('').map(char => char.charCodeAt(0)));
                const url = URL.createObjectURL(new Blob([buff], {type: 'image/jpeg'}));
                userList.innerHTML = `
                                        <div class="user">
                                            <div>
                                                <img src="${url}" alt="">
                                                <p id="user-name">${i.Data['FirstName']} ${i.Data.LastName}</p>
                                            </div>
                                            <button>View details</button>
                                        </div>
                                     `
            }
        }
    }
    
});

window.addEventListener('load', () => {
    fetch('/user-details').then(res => res.json())
    .then(data => {
        console.log(data);
        profileName.innerHTML = data.userName;

        const buffer = new Uint8Array(atob(data.pic).split('').map(char => char.charCodeAt(0)));
        const url = URL.createObjectURL(new Blob([buffer], {type: 'image/jpeg'}));
        profileImg.src = url;
    });
});









//----------PROFILE----------
profile.addEventListener('click', () => {

    fetch('/myAdmin', {
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        body: JSON.stringify({userName: profile.children[1].textContent})
    }).then(res => res.json()).then(data => {
        console.log(data)
        document.querySelector('#view-details-panel').style.display = 'flex';

        for(i of data){
        const buff = new Uint8Array(atob(i.File.buffer).split('').map(char => char.charCodeAt(0)));
        const url = URL.createObjectURL(new Blob([buff], {type: 'image/jpeg'}));

        document.querySelector('#panel').innerHTML = `
        <input type="button" value="X" id="exit-btn" />
        <img id="img" src="${url}" alt="" />
         <div>
            <label for="">User Name:</label>
            <input id="userName" class="info" type="text" readonly required value="${i.Data.UserName}">
        </div>
        <div>
            <label for="">First Name:</label>
            <input id="FirstName" class="info" type="text" readonly required value="${i.Data.FirstName}" />
        </div>
        <div>
            <label for="">Last Name:</label>
            <input id="LastName" class="info" type="text" readonly required value="${i.Data.LastName}" />
        </div>
        <div>
            <label for="">Email:</label>
            <input id="email" name="Email" class="info" type="email" readonly required value="${i.Data.Email}" />
        </div>
        <div>
            <label for="">Mobile Number:</label>
            <input id="MobileNumber" class="info" type="number" readonly required value="${i.Data.MobileNumber}" />
        </div>
         <div>
            <label for="">Password:</label>
            <input id="Password" class="info" type="text" readonly required value="${i.Data.Password}" />
        </div>
        <div>
            <label for="">Date of Birth:</label>
            <input id="DOB" class="info" type="date" readonly required value="${i.Data.DOB}">
        </div>                  
        <div id="buttons">
        <input type="button" value="Edit" class="edit-btn btn" />
        <input type="button" value="Delete Account" class="delete-btn btn" />
        <input name="ProfileImg" type="file" class="img-input btn" />
        </div>
                                             `

        }

        const panel = document.querySelector('#panel');
        const panelExit = document.querySelector('#panel #exit-btn');
        const editBtn = document.querySelector('#panel .edit-btn');
        const info = document.getElementsByClassName('info');
        const delBtn = document.querySelector('.delete-btn');
        const imgInput = document.querySelector('.img-input');

        panelExit.addEventListener('click', () => {
            document.querySelector('#view-details-panel').style.display = 'none';
        });

        editBtn.addEventListener('click', (e) => {
            if(e.target.value == 'Edit'){

                e.target.value = 'Save';

                Array.from(info).forEach(input => {
                    input.removeAttribute('readonly', '');
                });

                delBtn.style.display = 'block';
                imgInput.style.display = 'block';

            } else if(e.target.value == 'Save'){
                if(validate.filled(Array.from(info)) != false){
                    if(validate.email(document.querySelector('#email')) == true){

                        const file = imgInput.files[0];
                        const formData = new FormData();
                        formData.append('ProfileImg', file);
                        formData.append('FirstName', document.getElementById('FirstName').value);
                        formData.append('LastName', document.getElementById('LastName').value);
                        formData.append('Email', document.getElementById('email').value);
                        formData.append('MobileNumber', document.getElementById('MobileNumber').value);
                        formData.append('Password', document.getElementById('Password').value);
                        formData.append('userName', document.getElementById('userName').value);
                        formData.append('DOB', document.getElementById('DOB').value);
                        formData.append('id', data[0]._id);
                        
                    
                        console.log(formData);

                        console.log(panel)
                        fetch('/edit-admin', {
                            method: 'post',
                            body: formData
                        }).then(res => res.json()).then(data => {
                            console.log(data);
                        });

                    } else{
                        alert('Invalid email address!');
                    }
                } else{
                    alert('Please completely fill the form!');
                }
            }
        });

        delBtn.addEventListener('click', () => {
            fetch('/delete-admin', {
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                body: JSON.stringify({IdNumber: document.querySelector('#idNumber').value})
            }).then(res => res.json()).then(data => console.log(data));
        });

        imgInput.addEventListener('change', () => {

            const formData = new FormData();
            formData.append('ProfileImg', imgInput.files[0]);

            fetch('/uploadImage', {
                method: 'post',
                body: formData
            }).then(res => res.blob()).then(data => {
                const url = URL.createObjectURL(data);
                document.querySelector('#panel img').src = url;
            });
        });
    });

       
});










//----------ADMIN VIEW DETAILS BUTTON----------
window.addEventListener('click', (e) => {
    if(e.target.id == 'admin-list-vb'){
        console.log(adminList)
        document.querySelector('#view-details-panel').style.display = 'flex';
        const userName = e.target.parentElement.children[0].children[1].innerHTML;



        for(let i of adminList){
            if(i.userName == userName){

                const buff = new Uint8Array(atob(i.pic).split('').map(char => char.charCodeAt(0)));
                const url = URL.createObjectURL(new Blob([buff], {type: 'image/jpeg'}));

                document.querySelector('#panel').innerHTML = `
                <input type="button" value="X" id="exit-btn" />
                <img id="img" src="${url}" alt="" />
                 <div>
                    <label for="">User ID:</label>
                    <input id="idNumber" type="text" readonly required value="${i.userName}">
                </div>
                <div>
                    <label for="">First Name:</label>
                    <input id="FirstName" class="info" type="text" readonly required value="${i.FirstName}" />
                </div>
                <div>
                    <label for="">Last Name:</label>
                    <input id="LastName" class="info" type="text" readonly required value="${i.LastName}" />
                </div>
                <div>
                    <label for="">Email:</label>
                    <input id="email" name="Email" class="info" type="email" readonly required value="${i.Email}" />
                </div>
                <div>
                    <label for="">Mobile Number:</label>
                    <input id="MobileNumber" class="info" type="number" readonly required value="${i.MobileNumber}" />
                </div>                                                   `
            }
        }

        const panelExit = document.querySelector('#panel #exit-btn');

        panelExit.addEventListener('click', () => {
            document.querySelector('#view-details-panel').style.display = 'none';
        });

    }
})









//----------USER VIEW DETAILS BUTTON----------

let ID;

window.addEventListener('click', (e) => {
    if(e.target.id == 'user-list-vb'){
        document.querySelector('#view-details-panel').style.display = 'flex';
        const id = e.target.parentElement.children[1].innerHTML;

        for(let i of myArr){
            if(i.IdNumber == id){

                const buff = new Uint8Array(atob(i.File.buffer).split('').map(char => char.charCodeAt(0)));
                const url = URL.createObjectURL(new Blob([buff], {type: 'image/jpeg'}));

                document.querySelector('#panel').innerHTML = `
                <input type="button" value="X" id="exit-btn" />
                <img id="img" src="${url}" alt="" />
                <div>
                    <label for="">First Name:</label>
                    <input id="FirstName" class="info" type="text" readonly required value="${i.Data.FirstName}" />
                </div>
                <div>
                    <label for="">Last Name:</label>
                    <input id="LastName" class="info" type="text" readonly required value="${i.Data.LastName}" />
                </div>
                <div>
                    <label for="">Email:</label>
                    <input id="email" name="Email" class="info" type="email" readonly required value="${i.Data.Email}" />
                </div>
                <div>
                    <label for="">Matric Number:</label>
                    <input id="MatricNumber" class="info" type="number" readonly required value="${i.Data.MatricNumber}" />
                </div>
                <div>
                    <label for="">Mobile Number:</label>
                    <input id="MobileNumber" class="info" type="number" readonly required value="${i.Data.MobileNumber}" />
                </div>
                <div>
                    <label for="">User ID:</label>
                    <input id="idNumber" type="text" readonly required value="${i.IdNumber}">
                </div>
                <div>
                    <label for="">Date of Birth:</label>
                    <input id="DOB" class="info" type="date" readonly required value="${i.Data.DOB}">
                </div>                  
                <div id="buttons">
                <input type="button" id="status" value="Signin user" class="Signin-btn btn" />
                <input type="button" value="Edit" class="edit-btn btn" />
                <input type="button" value="Delete user" class="delete-btn btn" />
                <input name="ProfileImg" type="file" class="img-input btn" />
                </div>
                                                     `
                if(i.status == false){
                    document.querySelector('.Signin-btn').value = 'Signin user'
                } else{
                    document.querySelector('.Signin-btn').value = 'SignOut user'
                }
                ID = i.IdNumber;
            }
        }

        const panel = document.querySelector('#panel');
        const panelExit = document.querySelector('#panel #exit-btn');
        const editBtn = document.querySelector('#panel .edit-btn');
        const info = document.getElementsByClassName('info');
        const delBtn = document.querySelector('.delete-btn');
        const imgInput = document.querySelector('.img-input');
        const status = document.querySelector('#status');

        

        panelExit.addEventListener('click', () => {
            document.querySelector('#view-details-panel').style.display = 'none';
        });

        editBtn.addEventListener('click', (e) => {
            if(e.target.value == 'Edit'){

                e.target.value = 'Save';

                Array.from(info).forEach(input => {
                    input.removeAttribute('readonly', '');
                });

                delBtn.style.display = 'block';
                imgInput.style.display = 'block';

            } else if(e.target.value == 'Save'){
                if(validate.filled(Array.from(info)) != false){
                    if(validate.email(document.querySelector('#email')) == true){

                        const file = imgInput.files[0];
                        const formData = new FormData();
                        formData.append('ProfileImg', file);
                        formData.append('FirstName', document.getElementById('FirstName').value);
                        formData.append('LastName', document.getElementById('LastName').value);
                        formData.append('Email', document.getElementById('email').value);
                        formData.append('MobileNumber', document.getElementById('MobileNumber').value);
                        formData.append('MatricNumber', document.getElementById('MatricNumber').value);
                        formData.append('IdNumber', document.getElementById('idNumber').value);
                        formData.append('DOB', document.getElementById('DOB').value);
                        
                       
                        console.log(formData);

                        console.log(panel)
                        fetch('/edit', {
                            method: 'post',
                            body: formData
                        }).then(res => res.json()).then(data => {
                            console.log(data);
                        });

                    } else{
                        alert('Invalid email address!');
                    }
                } else{
                    alert('Please completely fill the form!');
                }
            }
        });

        delBtn.addEventListener('click', () => {
            fetch('/delete', {
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                body: JSON.stringify({IdNumber: document.querySelector('#idNumber').value})
            }).then(res => res.json()).then(data => console.log(data));
        });

        imgInput.addEventListener('change', () => {

            const formData = new FormData();
            formData.append('ProfileImg', imgInput.files[0]);

            fetch('/uploadImage', {
                method: 'post',
                body: formData
            }).then(res => res.blob()).then(data => {
                const url = URL.createObjectURL(data);
                document.querySelector('#panel img').src = url;
            });
        });

        status.addEventListener('click', () => {
            if(status.value == 'Signin user'){
                 fetch('/status', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                    body: JSON.stringify({id: ID, status: true})
                });

                status.value = 'SignOut user';
                document.querySelector('#total-signedin-users .number').textContent = Number(document.querySelector('#total-signedin-users .number').textContent) + 1; 
                document.querySelector('#total-signout .number').textContent = Number(document.querySelector('#total-signout .number').textContent) - 1; 
            } else{
                 fetch('/status', {
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                    body: JSON.stringify({id: ID, status: false})
                });

                status.value = 'Signin user';
                document.querySelector('#total-signedin-users .number').textContent = Number(document.querySelector('#total-signedin-users .number').textContent) - 1; 
                document.querySelector('#total-signout .number').textContent = Number(document.querySelector('#total-signout .number').textContent) + 1; 
            }
        });


    }
});





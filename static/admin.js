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
const profileImg = document.querySelector('#profile img');
let myArr = [];
let adminList = [];


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
        }

        totalUsers.innerHTML = data.length;

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
                                    <button>View details</button>
                                    
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
                <button>View details</button>
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
                <img src="${url}" alt="" />
                <div>
                    <label for="">First Name:</label>
                    <input name="FirstName" class="info" type="text" readonly required value="${i.Data.FirstName}" />
                </div>
                <div>
                    <label for="">Last Name:</label>
                    <input name="LastName" class="info" type="text" readonly required value="${i.Data.LastName}" />
                </div>
                <div>
                    <label for="">Email:</label>
                    <input name="Email" class="info" type="email" readonly required value="${i.Data.Email}" />
                </div>
                <div>
                    <label for="">Matric Number:</label>
                    <input name="MatricNumber" class="info" type="number" readonly required value="${i.Data.MatricNumber}" />
                </div>
                <div>
                    <label for="">Mobile Number:</label>
                    <input name="MobileNumber" class="info" type="number" readonly required value="${i.Data.MobileNumber}" />
                </div>
                <div>
                    <label for="">User ID:</label>
                    <input type="text" readonly required value="${i.IdNumber}">
                </div>
                <div>
                    <label for="">Date of Birth:</label>
                    <input name="DOB" class="info" type="date" readonly required value="${i.Data.DOB}">
                </div>                  
                <div id="buttons">
                <input type="button" value="Signin user" class="Signin-btn btn" />
                <input type="button" value="Edit" class="edit-btn btn" />
                <input type="button" value="Delete user" class="delete-btn btn" />
                <input type="file" class="img-input btn" />
                </div>
                                                     `
            }
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

            }
        })


    }
});





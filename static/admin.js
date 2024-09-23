const dbBtn = document.querySelector('#dashboard-btn');
const userBtn = document.querySelector('#user-management-btn');
const caBtn = document.querySelector('#card-allocation-btn');
const dashboard = document.querySelector('#dashboard');
const userManagement = document.querySelector('#user-management');
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


const displaySections = (e) => {
    
    switch(e.target.innerHTML){
        case 'Dashboard':
            userManagement.style.display = 'none';
            cardAllocation.style.display = 'none';
            dashboard.style.display = 'grid';
            section.innerHTML = e.target.innerHTML;
            break;
        case 'Admin User Management':
            dashboard.style.display = 'none';
            cardAllocation.style.display = 'none';
            userManagement.style.display = 'block';
            section.innerHTML = e.target.innerHTML;
            break;
        case 'Card Allocation':
            dashboard.style.display = 'none';
            userManagement.style.display = 'none';
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
                <button>View details</button>
            </div>
          `
        }

        totalUsers.innerHTML = data.length;

    });

    fetch('/admin-users').then(res => res.json()).then(data => {
        console.log(data);
    })

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





const dbBtn = document.querySelector('#dashboard-btn');
const userBtn = document.querySelector('#user-management-btn');
const caBtn = document.querySelector('#card-allocation-btn');
const dashboard = document.querySelector('#dashboard');
const userManagement = document.querySelector('#user-management');
const cardAllocation = document.querySelector('#card-allocation');
const section = document.querySelector('#section');

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
})



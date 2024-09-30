const message = document.querySelector('#message');

window.addEventListener('load', () => {
    if(message.textContent != ''){
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 3000);
    }
});
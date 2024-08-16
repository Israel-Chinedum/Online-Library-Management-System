const id = document.querySelector('#id-number');
const img = document.querySelector('#img');
const info = document.querySelectorAll('#text-info p');
const qrImg = document.querySelector('#qr-image');
const qrCodeBtn = document.querySelector('#qr-code-btn');

window.addEventListener('load', async () => {

    let fieldValue;

    await fetch('/userInfo', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: `${id.innerHTML}`})
    }).then(res => res.json()).then( data => {
        console.log(data)
        fieldValue = data;
    });

   
        for(let i in fieldValue){
            info.forEach(field =>{
                if(i == field.id){
                    field.innerHTML = fieldValue[`${i}`];
                }
            })
           
        }

    const formData = new FormData();
    formData.append('id', `${id.innerHTML}`);

    fetch('/userPic', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: `${id.innerHTML}`})
    }).then(res => res.text()).then(data => {

      const buffer = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));

      console.log(data);
      console.log(buffer);
    
     img.src = URL.createObjectURL(new Blob([buffer], {type: 'image/jpeg'}));
      
    }).catch(error => console.log(error));

    fetch('/qrcode', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: `${id.innerHTML}`})
    }).then(res => res.blob()).then(data => {

        // const buffer = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));
        qrImg.src = URL.createObjectURL(new Blob([data], {type: 'image/png'}));
    })

});

qrCodeBtn.addEventListener('click', () => {
    const anchor = document.createElement('a');
    anchor.href = qrImg.src;
    anchor.setAttribute('download', '')
    anchor.click()
});
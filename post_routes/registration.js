export const register = (app, fs, uploadData) =>{

    // const formData = uploadData.array(
    //     [
    //         {name: 'ProfileImg', maxCount: 1},
    //         {name: 'FirstName'},
    //         {name: 'LastName'},
    //         {name: 'MatricNumber'},
    //         {name: 'MobileNumber'},
    //         {name: 'Email'},
    //         {name: 'DOB'}
    //     ]
    // )

    app.post('/register', uploadData.single('ProfileImg'), (req, res) => {

        console.log(req.body);
        console.log(req.file);

        Promise.resolve(req.body['file'] = req.file)
        .then(() => {
            console.log(req.body);
            res.send('<h1 style="color: green">Data has been recieved! ✔</h1>');
        });

        

        

    });

}
export const upload = (app, uploadFile, fs) =>{

    app.post('/uploadImage', uploadFile.single('ProfileImg'), (req, res)=>{
        console.log('favour')
        console.log(req.file);

        fs.readFile(`./uploads/${req.file['filename']}`, (err, data) =>{
            if(err) throw err;

            console.log(data);

            res.send(data);

        });

    });

}
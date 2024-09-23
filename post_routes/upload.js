export const upload = (app, uploadFile, fs) =>{

    app.post('/uploadImage', uploadFile.single('ProfileImg'), (req, res)=>{
        console.log('favour')
        console.log(req.file);
        console.log(req.file.buffer)

        //PUSHING TO DATABASE
        const fileBuffer = req.file.buffer;
        const mimetype = req.file.mimetype;

         // const test = new fileModel({
         //    file: fileBuffer,
         //    fileType: mimetype,
         //    fileName: req.file.originalname
         // })
         
         // test.save().then(() => {
         //    res.send(req.file.buffer);
         // });

         res.send(req.file.buffer);

    });

}
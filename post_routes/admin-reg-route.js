export const adminReg = (app, adminData, adminModel) => {
     app.post('/admin-reg', adminData.single('ProfileImg'), (req, res) => {
        adminModel({
            Data: req.body,
            File: req.file
        }).save().then(() => {
               console.log('A new user has been added!');
        })

        res.render('admin-login', {error: ''});

     });
}
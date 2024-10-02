export const update = (app, updateData, userModel, adminModel) =>{
    app.post('/edit', updateData.single('ProfileImg'), async (req, res) => {
        console.log(req.body);
            await userModel.updateOne({IdNumber: req.body.IdNumber}, {
            "Data.FirstName": req.body.FirstName,
            "Data.LastName": req.body.LastName,
            "Data.Email": req.body.Email,
            "Data.MatricNumber": req.body.MatricNumber,
            "Data.MobileNumber": req.body.MobileNumber,
            "Data.DOB": req.body.DOB,
            File: req.file
        });
        res.json('Ive seen it!');
    });

    app.post('/edit-admin', updateData.single('ProfileImg'), async (req, res) => {
        console.log(req.body);
            await adminModel.updateOne({_id: req.body.id}, {
            "Data.FirstName": req.body.FirstName,
            "Data.LastName": req.body.LastName,
            "Data.Email": req.body.Email,
            "Data.Password": req.body.MatricNumber,
            "Data.MobileNumber": req.body.MobileNumber,
            "Data.UserName": req.body.userName,
            "Data.DOB": req.body.DOB,
            File: req.file
        });
        res.json('Ive seen it!');
    });

    app.post('/delete', (req, res) => {
        userModel.deleteOne({IdNumber: req.body.IdNumber})
        .then(() => {
            console.log('User has been deleted!');
            res.json('User has been deleted!');
        });
    });

    app.post('/delete-admin', (req, res) => {
        adminModel.deleteOne({_id: req.body.id})
        .then(() => {
            console.log('User has been deleted!');
            res.json('User has been deleted!');
        });
    });


    app.post('/status', async (req, res) => {
        console.log(req.body)
        await userModel.updateOne({IdNumber: req.body.id}, {
            status: req.body.status
        });

        res.json('Done!');

    })
}
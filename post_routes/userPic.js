export const userPic = (app, fs, userModel) => {
    app.post('/userPic', (req, res) => {
        console.log(req.body);
        userModel.find({IdNumber: req.body.id}).then( students => {
            res.send(students[0]['File']['buffer'].toString('base64'));
        })
    })
}
export const userInfo = (app, fs, userModel) => {
    app.post('/userInfo', (req, res) =>{

        console.log(req.body);

        userModel.find({}).then(students => {
            for(let i of students){
                if(i['IdNumber'] == req.body['id']){
                    res.send(i['Data']);
                    console.log(i['Data']);
                }
            }
        });

    })
}
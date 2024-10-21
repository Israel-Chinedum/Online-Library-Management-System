export const adminLogin = (app, adminModel) => {

    let userDetails = {};
    let isValidUser;

    app.post('/admin-login', async (req, res) => {
        console.log(req.body);

       await adminModel.find({"Data.Email": req.body.Email, "Data.Password": req.body.Password}).then((user) =>{
        
            if(user.length != 0){
                for(let i of user){
                    userDetails.userName = i.Data.UserName;
                    userDetails.pic = i["File"]["buffer"];
                }
            
                isValidUser = true;

            } else{
                console.log('Invalid email address or password!');
                isValidUser = false;
            }
        });

        if(isValidUser){
            res.render('admin');
        } else{
            res.render('admin-login', {error: "Invalid email address or password!"});
        }

    });

    app.get('/user-details', async (req, res) => {
        res.json(userDetails);
    })
}
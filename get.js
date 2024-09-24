class GetRequest{
    get(app, userModel, adminModel){

        app.get('', (req, res)=>{
            res.render('home');
        });

        app.get('/register', (req, res) => {
            res.render('register');
        });

        app.get('/createPassword', (req, res) => {
            res.render('createPassword');
        });

        app.get('/profile', (req, res) =>{
            const id = req.query.id;
            res.render('profile', {id});
        });

        app.get('/admin', async (req, res) => {
            res.render('admin');
        });

        app.get('/admin-users', async (req, res) => {

            const adminUserDetails = [];

            await adminModel.find({}).then(adminUsers => {

                for(let i of adminUsers){
                    adminUserDetails.push({
                        userName: i.Data.UserName,
                        pic: i.File.buffer,
                        FirstName: i.Data.FirstName,
                        LastName: i.Data.LastName,
                        MobileNumber: i.Data.MobileNumber
                });
                }
                
            }).catch( err => {
                console.log(err);
            });

            res.json(adminUserDetails);

        });

        app.get('/user-data', (req, res) => {

            userModel.find({}).then((users) => {
                res.json(users);
            }).catch(err => {
                console.log(err);
            });
        })

        app.get('/admin-reg', (req, res) => {
            res.render('admin-reg');
        });

        app.get('/admin-login', (req, res) => {
            res.render('admin-login');
        });

        app.get('/students', (req, res)=>{

            new userModel({
                name: 'Favour',
                age: 20,
                email: 'chinedumfavourite@gmail.com'
            }).save().then(() =>{
                res.send('Request has been sent!');
            })
            
        });

    }
} export default new GetRequest();
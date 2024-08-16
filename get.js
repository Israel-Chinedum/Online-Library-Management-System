class GetRequest{
    get(app, userModel, db){

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
            res.render('profile');
        })

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
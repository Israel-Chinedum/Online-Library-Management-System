class GetRequest{
    get(app, userModel){

        app.get('', (req, res)=>{
            res.render('home');
        });

        app.get('/register', (req, res) => {
            res.render('register');
        });

        app.get('/createPassword', (req, res) => {
            res.render('createPassword');
        });

        app.get('/students', (req, res)=>{

            const info = new userModel({
                    name: "Favour Israel",
                    age: 20,
                    gpa:4
            });

            info.save().then(() =>{
                userModel.find({}).then( students =>{
                    res.json(students[0]);
                });
            });

            
        });

    }
} export default new GetRequest();
import { random } from '../random.js'

export const register = (app, fs, uploadData, userModel) =>{

   

    app.post('/register', uploadData.single('ProfileImg'), async (req, res) => {

        const idArray = [];
        let number = 0;
        let id;
        
        const pushData = (id) => {
             userModel({
                Data: req.body,
                File: req.file,
                IdNumber: id
            }).save().then( () => {
                res.render('profile', {id});
            });
        }

        await userModel.find({}).then(students => {
            for(let i of students){
                idArray.push(i.IdNumber);
            }       
        });

        const valLoop = await setInterval(() => {
            number++
            id = random('cap');
            for(let i of idArray){
                if(i == id){   
                    console.log(`[Err:${number}]id already exists; generating new id...`);
                    return;
                }
             }
            console.log(`approved id: ${id}`);
            pushData(id);
            clearInterval(valLoop);
        }, 1000)

       


        // new userModel.find({}).then(students => {
        //     for(let i of students){
        //         if(i.idNumber == id){
        //             res.send
        //         }
        //     }
        // });

  
    });

}
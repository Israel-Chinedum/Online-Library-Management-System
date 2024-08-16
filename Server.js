//IMPORTING PACKAGES
import express, { urlencoded } from 'express';
import gr from './get.js';
import { upload } from './post_routes/upload.js';
import { register } from './post_routes/registration.js';
import multer from 'multer';
import fs from 'fs';
import mongoose from 'mongoose';


//DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/school');

//DEFINE FIELDS
const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    gpa: Number
});

const userModel = mongoose.model('students', userSchema);



//ASSIGNING EXPRESS TO THE APP VARIABLE
const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    }, 
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const uploadFile = multer({storage});

const data = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    }, 

    fields: [
        {name: 'ProfileImg', maxCount: 1},
        {name: 'FirstName'},
        {name: 'LastName'},
        {name: 'MatricNumber'},
        {name: 'MobileNumber'},
        {name: 'Email'},
        {name: 'DOB'}
    ],

    filename: function(req, file, cb){
        cb(null, file.originalname);
    }

})

const uploadData = multer({data});

//SETTING THE VIEW ENGINE
app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({extended: false}));

//SETTING EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

//GET REQUEST HANDLERS
gr.get(app, userModel);

//POST REQUEST HANDLERS
register(app, fs, uploadData);
upload(app, uploadFile, fs);


//SETTING PORT TO LISTEN FOR INCOMING REQUESTS
app.listen(3600, 'localhost', ()=>{
    console.log('LIBRARY SYSTEM IS NOW ONLINE');
});
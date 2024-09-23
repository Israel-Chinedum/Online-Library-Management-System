//IMPORTING PACKAGES
import express, { urlencoded } from 'express';
import gr from './get.js';
import { upload } from './post_routes/upload.js';
import { register } from './post_routes/registration.js';
import multer from 'multer';
import fs from 'fs';
import mongoose from 'mongoose';
import {random} from './random.js';
import { userInfo } from './post_routes/userInfo.js';
import { userPic } from './post_routes/userPic.js';
import QRCODE from 'qrcode';
import { qrcode } from './post_routes/qrcode.js';
import { adminReg } from './post_routes/admin-reg-route.js';
import { adminLogin } from './post_routes/admin-login-route.js';




// let num = false;
// const ref = ['string'];y
// const one = 'string';
// const two = ref[0];

// console.log(one == two);

// //recall
// const recall = () => {
//     if(!num){
//         console.log('recalling!', `${number++}`);
//         recall()
//     } else if(num){
//         console.log('recall ended!');
//     }
// }

// recall();


//DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/library');

//DEFINE FIELDS
const userSchema = mongoose.Schema({
    Data: Object,
    File: Object,
    IdNumber: String
});


const userModel = mongoose.model('students', userSchema);

const adminSchema = mongoose.Schema({
    Data: Object,
    File: Object
}, {collection: 'admins'})

const adminModel = mongoose.model('admins', adminSchema);

//ASSIGNING EXPRESS TO THE APP VARIABLE
const app = express();

const storage = multer.memoryStorage();
const uploadFile = multer({storage});

const adminData = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },

    fields: [
        {name: "FirstName"},
        {name: "LastName"},
        {name: "Email"},
        {name: "MobileNumber"},
        {name: "UserName"},
        {name: "DOB"}
    ]
});

const adminInfo = multer({adminData});

const data = multer.diskStorage({

    destination: (req, file, cb) =>{
        cb(null, './uploads');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },

    fields: [
        {name: 'FirstName'},
        {name: 'LastName'},
        {name: 'MatricNumber'},
        {name: 'MobileNumber'},
        {name: 'Email'},
        {name: 'DOB'}
    ]

});
const uploadData = multer({data});


//SETTING THE VIEW ENGINE
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//SETTING EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

//GET REQUEST HANDLERS
gr.get(app, userModel, adminModel);

//POST REQUEST HANDLERS
register(app, fs, uploadData, userModel);
upload(app, uploadFile, fs);
userInfo(app, fs, userModel);
userPic(app, fs, userModel);
qrcode(app, fs, QRCODE);
adminReg(app, adminInfo, adminModel);
adminLogin(app, adminModel);



//SETTING PORT TO LISTEN FOR INCOMING REQUESTS
app.listen(3600, 'localhost', ()=>{
    console.log('LIBRARY SYSTEM IS NOW ONLINE');
});
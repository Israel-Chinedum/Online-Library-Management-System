//IMPORTING PACKAGES
import express, { urlencoded } from 'express';
import gr from './get.js';
import { upload } from './post_routes/upload.js';
import { register } from './post_routes/registration.js';
import multer from 'multer';
import nodeMailer from 'nodemailer';
import fs from 'fs';
import mongoose from 'mongoose';
import {random} from './random.js';
import { userInfo } from './post_routes/userInfo.js';
import { userPic } from './post_routes/userPic.js';
import QRCODE from 'qrcode';
import { qrcode } from './post_routes/qrcode.js';
import { adminReg } from './post_routes/admin-reg-route.js';
import { adminLogin } from './post_routes/admin-login-route.js';
import { forgot } from './post_routes/forgot_route.js';
import { update } from './post_routes/update.js';
import { myAdmin } from './post_routes/myAdmin.js';




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
mongoose.connect('mongodb+srv://fastarfavour:fastar081@librarysystem.m17rk.mongodb.net/?retryWrites=true&w=majority&appName=LibrarySystem/test').then(() => {
    console.log('Mongoose connected!');
});

//DEFINE FIELDS
const userSchema = mongoose.Schema({
    Data: Object,
    File: Object,
    IdNumber: String,
    status: Boolean
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

const updateInfo = multer.diskStorage({
    destination: (req, file, cb) => {
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
        {name: 'IdNumber'},
        {name: 'DOB'},
    ]
});
const updateData = multer({updateInfo});


//SETTING THE VIEW ENGINE
app.set('view engine', 'ejs');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false}));

//SETTING EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

//EMAIL SERVICES
// const transporter = nodeMailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'mytechstudio081@gmail.com',
//         pass: 'gcpx hbqx cvtc zakp'
//     }
// });

// const mailOptions = {
//     from: 'TechStudio',
//     to: 'chinedumfavourite@gmail.com',
//     subject: 'New Password',
//     html: '<p style="color:red; background-color:green">this is the password you will be using</p>'
// }

// transporter.sendMail(mailOptions, (err, info) => {
//     if(err){
//         console.log(err);
//     } 
//     else{
//         console.log('Email sent: ' + info.response);
//     }
// })

//GET REQUEST HANDLERS
gr.get(app, userModel, adminModel);

//POST REQUEST HANDLERS
register(app, fs, uploadData, userModel);
upload(app, uploadFile, fs);
userInfo(app, fs, userModel);
userPic(app, fs, userModel);
qrcode(app, nodeMailer, QRCODE);
adminReg(app, adminInfo, adminModel);
adminLogin(app, adminModel);
forgot(app, nodeMailer, adminModel);
update(app, updateData, userModel, adminModel);
myAdmin(app, adminModel);



//SETTING PORT TO LISTEN FOR INCOMING REQUESTS
app.listen(3600, 'localhost', ()=>{
    console.log('LIBRARY SYSTEM IS NOW ONLINE');
});
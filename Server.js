//IMPORTING PACKAGES
import express from 'express';
import ejs from 'ejs';
import gr from './get.js';

//ASSIGNING EXPRESS TO THE APP VARIABLE
const app = express();

//SETTING THE VIEW ENGINE
app.set('view engine', 'ejs');

//SETTING EXPRESS TO USE STATIC FILES
app.use(express.static('static'));

//HANDLING GET REQUESTS
gr.get(app);

//SETTING PORT TO LISTEN FOR INCOMING REQUESTS
app.listen(3600, 'localhost', ()=>{
    console.log('LIBRARY SYSTEM IS NOW ONLINE');
});
const express = require("express");
const app = express();
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const path = require("path");
const connectDB = require('./db/connectDB')
const hbs = require('hbs')
const session = require('express-session')
const nocache = require('nocache');
const router = require("./routes/admin");



app.use(nocache())
app.use(session({secret:'mysecretkey',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }

}))


//setting view engine
app.set('view engine','hbs');

//static assets setup
app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//routes for user and admin
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

//connect to mongoDB
connectDB();

app.listen(3003,()=>{
    console.log("server started at:http://localhost:3003");
    
})
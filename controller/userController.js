const userSchema = require("../model/userModel")
const bcrypt = require('bcrypt')
const saltround = 10;


const logout = (req,res)=>{
    req.session.user = null
    res.redirect('/user/login')
   // console.log(req);
    
}

//console.log(logout);


const registerUser = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await userSchema.findOne({email})
        if(user) return res.render('user/register',{message:"User already exists"})
            const hashedPassword = await bcrypt.hash(password,saltround) 
      //create new user
        const newUser = new userSchema({
            email,
            password:hashedPassword
        })
        await newUser.save()
        res.render('user/login',{message:"User created successfully"})
    } catch (error) {
        res.render('user/register',{message:"Something went wrong"})
        
    }
}



   


const login = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userSchema.findOne({email})//check email exist
        if(!user) return res.render('user/login',{message:"User does not exists"})
        const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.render('user/login',{message:"Incorrect password"})
                req.session.user = true
                res.render('user/userHome',{message:'Login Successful'})
    } catch (error) {
        console.log(error)
        res.render('user/login',{message:"Something went wrong"})
    }
}

const loadRegister = (req,res)=>{
    res.render("user/register")
}
const loadLogin = (req,res)=>{
    res.render("user/login")
}

const loadHome = (req,res)=>{
    res.render('user/userHome')
}

module.exports = {
            registerUser,
            loadRegister,
            loadLogin,
            login,
            loadHome,
            logout,
        }
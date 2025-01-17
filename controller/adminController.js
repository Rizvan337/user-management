const adminModel = require('../model/adminModel')
const bcrypt = require('bcrypt') 
const userModel = require('../model/userModel')
const loadLogin = async (req,res)=>{
    res.render("admin/login")
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body

        const admin = await adminModel.findOne({email})
        if(!admin) return res.render('admin/login',{message:'Invalid credentials'})
            const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch) return res.render('admin/login',{message:'Invalid credentials'})
            req.session.admin = true
        res.redirect('/admin/dashboard')
    } catch (error) {
        res.send(error)
    }
}



const editUser = async (req,res)=>{
    try {
        const {email,password,id} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userModel.findOneAndUpdate({_id:id},
            {$set:{email,password:hashedPassword}})
        res.redirect('/admin/dashboard')            
    } catch (error) {
        console.log(error);
        
    }
}

const deleteUser = async (req,res)=>{
try {
    const {id} = req.params

    const user = await userModel.findOneAndDelete({_id:id})
    res.redirect('/admin/dashboard')
} catch (error) {
    console.log(error);
    
}
}

const addUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const  newuser = new userModel({
           email,
           password:hashedPassword
        })   
        await newuser.save()
        res.redirect('/admin/dashboard')
   
       
    } catch (error) {
        console.log(error);
    
}
}
const logout = async (req,res)=>{
    req.session.admin = null
    res.redirect('/admin/login')
}
// search-start
const loadDashboard = async (req, res) => {
    try {
        const admin = req.session.admin;
        if (!admin) return res.redirect('/admin/login');

        const searchQuery = req.query.searchQuery || '';
        let users;

        if (searchQuery) {
            users = await userModel.find({ email: new RegExp(searchQuery, 'i') });
        } else {
            users = await userModel.find();
        }

        res.render('admin/dashboard', { users, searchQuery });
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
};
// search-end



module.exports = {loadLogin,
    login,
    loadDashboard,
    editUser,
    deleteUser,
    addUser,
    logout
}
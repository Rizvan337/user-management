const checkSession = (req,res,next)=>{
    if(req.session.admin){
        console.log(req);
        
        next()
    }else{
        res.redirect('/admin/login')
    }
}
console.log(checkSession);


const isLogin = (req,res,next)=>{
    if(req.session.admin){
        res.redirect('/admin/dashboard')
    }else{
        next()
    }
}

module.exports = {checkSession,isLogin}
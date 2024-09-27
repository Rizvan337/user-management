const checkSession = (req,res,next)=>{
    if(req.session.user){
        console.log(req);
        
        next()
    }else{
        res.redirect('/user/login')
    }
}
console.log(checkSession);


const isLogin = (req,res,next)=>{
    if(req.session.user){
        res.redirect('/user/home')
    }else{
        next()
    }
}

module.exports = {checkSession,isLogin}
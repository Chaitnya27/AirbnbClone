const User = require("../models/user")

module.exports.renderSignupForm = (req,res)=>{
    res.render("user/signup.ejs");
}
module.exports.Signup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registerUserr =await User.register(newUser,password);
    console.log(registerUserr);
    req.login(registerUserr,(err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","Welcome to WonderLust");
   res.redirect("/listings");
    });
    

    } catch(e){
        req.flash("error",e.message);
        
        res.redirect("/signup");
        
    }   
}

module.exports.renderLogin = (req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login = async(req,res)=>{ 
    req.flash("success","Welcome to WonderLust!")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}


module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err)
        }
        req.flash("success","You logout Successfully");
        res.redirect("/listings");
    })
}
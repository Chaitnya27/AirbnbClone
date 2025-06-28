const express = require("express");
const app = express();
const session = require("express-session"); 
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

const sessionOption = {secret : "myscerete",
    resave:false,
    saveUninitialized:true
}

app.use(session(sessionOption))
app.use(flash());

app.use((req,res,next)=>{
    res.locals.SuccessMsg= req.flash("Suceess");
    res.locals.ErrorMsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name = "Ananomys"}= req.query;
    req.session.name = name;
    if(name === "Ananomys"){
        req.flash("error","User not register")
    }
    else{
        req.flash("Suceess","Registered Successfully")
    }
   
   res.redirect("/hello")
})

app.get("/Hello",(req,res)=>{
   

    res.render("page.ejs",{name: req.session.name,msg : req.flash("Suceess")})
})

// app.get("/reqCount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
   
//     res.send(`you send req for ${req.session.count} times`)
// })

// app.get("/test",(req,res)=>{
//     res.send("test success")
// })

app.listen(3000,(req,res)=>{
    console.log("success")
})
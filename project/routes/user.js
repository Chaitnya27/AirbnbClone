const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js")


router.
route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.Signup))



router.
route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl,
  passport.authenticate("local", {
        failureRedirect : '/login',
        failureFlash: true
      }),userController.login) 



router.post("/login",saveRedirectUrl,
  
    passport.authenticate("local", {
        failureRedirect : '/login',
        failureFlash: true
      }),userController.login)     
    
    router.get("/logout",userController.logout)

module.exports = router;
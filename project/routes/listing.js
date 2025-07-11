const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner}= require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({storage})




const validateListing =(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg)
    }
    else{
        next();
    }
};

router.
route("/")
.get(wrapAsync(listingController.index))
 .post(isLoggedIn,
    upload.single("listing[image]"),
     validateListing,

     wrapAsync(listingController.createListing));


//new route 
router.get("/new",isLoggedIn,listingController.renderNewForm)

router.
route("/:id")
.get(wrapAsync(listingController.showListing)) //show route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,
    wrapAsync(listingController.updateListing)) //update route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing)) //delete route
    


//edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))

 
module.exports = router;
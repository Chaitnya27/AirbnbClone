const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
 const Listing = require("../models/listing.js");
 const {isLoggedIn, isAuthor} = require("../middleware.js");
 const reviewController = require("../controller/review.js");


const validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg)
    }
    else{
        next();
    }
};


//reviews
//Post review Route
router.post("/",isLoggedIn,validateReview,
    wrapAsync(reviewController.createReview))

//post delete review

router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;
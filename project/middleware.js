const Listing = require("./models/listing")
const Review = require("./models/reviews")
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.rediretedUrl = req.originalUrl;
        req.flash("error","You must Logged in to do any Changes");
      return res.redirect("/login")
}
next();
}

module.exports.saveRedirectUrl= (req,res,next)=>{
    if(req.session.rediretedUrl){
        res.locals.redirectUrl = req.session.rediretedUrl;
    }
    next();
}

module.exports.isOwner =async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission to do any changes");
        return res.redirect(`/listings/${id}`);
    }
    next()
}

module.exports.isAuthor =async (req,res,next)=>{
    let {id, reviewId} = req.params;
    let review= await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permission to do any changes");
        return res.redirect(`/listings/${id}`);
    }
    next()
}
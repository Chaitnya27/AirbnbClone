const Listing = require("../models/listing");

module.exports.index =async (req,res)=>{
    const allListings= await Listing.find({}); //index route
    res.render("listings/index.ejs",{allListings})
    };

module.exports.renderNewForm= (req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    let listings = await Listing.findById(id).populate({path: "reviews",
        populate :{
            path : "author",
        },
    }).populate("owner");
    if(!listings){
        req.flash("Error","Listings you are Requetings does not exist")
        res.redirect("/listings")
    }
    console.log(listings);
    res.render("listings/show.ejs",{listings})
}

module.exports.createListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
   
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image ={url , filename}; 
    await newlisting.save();
    req.flash("Success","New Listing Created!")
    res.redirect("/listings");   
}

module.exports.editListing=async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("Error","Listings you are Requetings does not exist")
        res.redirect("/listings")
    }
    let originalImage = listing.image.url;
    originalImage =originalImage.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing,originalImage});
}

module.exports.updateListing = async(req,res)=>{
    
    let {id} = req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});

   if(typeof req.file !=="undefined"){
   let url = req.file.path;
   let filename = req.file.filename;

   listing.image={url,filename};

   await listing.save();
   }
    req.flash("Success","Listing Updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res)=>{
    let{id}=req.params;
    let deletedlist= await Listing.findByIdAndDelete(id);
    console.log(deletedlist);
    req.flash("Success","Listing Deleted")
    res.redirect("/listings");
}
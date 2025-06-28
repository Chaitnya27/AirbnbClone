const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata =require("./data.js");

main().then((res)=>{
    console.log("Sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

const initDB = async ()=> {
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj, owner: "6844001c6cadec9fed26ba3f"}));
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
}

initDB();
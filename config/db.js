require("dotenv").config();
const mongoose=require('mongoose');

const connectdb = async()=>{
    try{
         await mongoose.connect(process.env.mongodb_url)
         console.log("connected db")
    }catch(err){
        console.error("MongoDB Connection Error:");
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectdb

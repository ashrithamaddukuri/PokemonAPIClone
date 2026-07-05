const mongoose = require('mongoose');


const Userschema = mongoose.Schema({
    name:{
        type:String
    },
    mail:{
        type:String
    },
    number:{
        type:Number
    },
    password:{
        type:String
    },

})

module.exports = mongoose.model('User',Userschema)
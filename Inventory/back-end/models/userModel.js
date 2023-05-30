var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        firstName :{type:String},
        lastName: {type:String},
        email : {type:String,unique:true},
        mobile : {type:String},
        password : {type:String},
        role:{type:String},
        accessibility:[String],
        photo : {type:String},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
);

var userModel = mongoose.model('users',userSchema);

module.exports=userModel;
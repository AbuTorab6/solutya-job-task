var mongoose = require('mongoose');

var otpSchema = new mongoose.Schema(
    {
        email : {type:String},
        otp : {type:String},
        status : {type:String, default:0},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
);

var otpModel = mongoose.model('otp',otpSchema);

module.exports=otpModel
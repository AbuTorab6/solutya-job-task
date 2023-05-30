var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        customerName:{type:String},
        address:{type:String},
        phone:{type:String,unique:true},
        email:{type:String},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
);

var customerModel = mongoose.model('customers',customerSchema);

module.exports=customerModel;
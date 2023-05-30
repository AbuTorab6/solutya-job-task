var mongoose = require('mongoose');

var supplierSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        supplierName:{type:String},
        address:{type:String},
        phone:{type:String,unique:true},
        email:{type:String},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
);

var supplierModel = mongoose.model('suppliers',supplierSchema);

module.exports=supplierModel
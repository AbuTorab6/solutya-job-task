var mongoose = require('mongoose');

var brandSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        name:{type:String,unique:true},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
);

var brandModel = mongoose.model('brands',brandSchema);

module.exports=brandModel;
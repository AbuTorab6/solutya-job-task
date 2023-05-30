var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        name:{type:String,unique:true},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
);

var categoryModel = mongoose.model('category',categorySchema);

module.exports=categoryModel;

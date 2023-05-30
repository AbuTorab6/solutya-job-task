var mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        categoryId:{type:mongoose.Schema.Types.ObjectId},
        brandId:{type:mongoose.Schema.Types.ObjectId},
        name:{type:String},
        unit:{type:String},
        details:{type:String},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
)

var productModel = mongoose.model('products',productSchema);

module.exports=productModel;
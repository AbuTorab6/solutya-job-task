var mongoose = require('mongoose');

var purchaseSummarySchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        supplierId:{type:mongoose.Schema.Types.ObjectId},
        vatTax:{type:Number},
        discount:{type:Number},
        otherCost:{type:Number},
        shippingCost:{type:Number},
        grandTotal:{type:Number},
        note:{type:String},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
)

var purchaseSummaryModel = mongoose.model('purchaseSummary',purchaseSummarySchema);

module.exports=purchaseSummaryModel;
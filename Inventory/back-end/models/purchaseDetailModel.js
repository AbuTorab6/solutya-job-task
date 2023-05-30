var mongoose = require('mongoose');

var purchaseDetailSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        purchaseSummaryId:{type:mongoose.Schema.Types.ObjectId},
        productId:{type:mongoose.Schema.Types.ObjectId},
        quantity:{type:Number},
        unitCost:{type:Number},
        total:{type:Number},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
)

var purchaseDetailModel = mongoose.model('purchaseDetail',purchaseDetailSchema);

module.exports=purchaseDetailModel;
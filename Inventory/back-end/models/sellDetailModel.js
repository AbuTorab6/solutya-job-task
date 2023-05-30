var mongoose = require('mongoose');

var sellDetailSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        sellSummaryId:{type:mongoose.Schema.Types.ObjectId},
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

var sellDetailModel = mongoose.model('sellDetails',sellDetailSchema);

module.exports = sellDetailModel;
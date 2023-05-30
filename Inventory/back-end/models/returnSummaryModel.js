var mongoose = require('mongoose');

var returnSummarySchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        customerId:{type:mongoose.Schema.Types.ObjectId},
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

var returnSummaryModel = mongoose.model('returnSummaries',returnSummarySchema);

module.exports = returnSummaryModel;
var mongoose = require('mongoose');


var returnDetailSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        returnSummaryId:{type:mongoose.Schema.Types.ObjectId},
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

var returnDetailModel = mongoose.model('returnDetails',returnDetailSchema);

module.exports=returnDetailModel;
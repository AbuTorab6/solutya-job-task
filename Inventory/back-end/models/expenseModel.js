var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        expenseTypeId:{type:mongoose.Schema.Types.ObjectId},
        amount:{type:Number},
        note:{type:String},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
)

var expenseModel = mongoose.model('expenses',expenseSchema)

module.exports=expenseModel;
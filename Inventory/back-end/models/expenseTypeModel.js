var mongoose = require('mongoose');

var expenseTypeSchema = new mongoose.Schema(
    {
        userEmail:{type:String},
        name:{type:String,unique:true},
        createdDate : {type:Date, default:Date.now()}
    },
    {
        versionKey:false
    }
)

var expenseTypeModel = mongoose.model('expenseTypes',expenseTypeSchema);

module.exports=expenseTypeModel;
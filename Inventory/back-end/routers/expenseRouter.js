var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');
var mongoose = require('mongoose')

var expenseModel = require('../models/expenseModel');



var createExpense = async(req,res)=>
{
    var dataFromPostman = req.body;
    var tokenFromPostman = req.headers.authorization;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);
            
            var accessibility = dataFromToken.accessibility;

            if(accessibility.includes("expense"))
            {
                var ob = new expenseModel({
                    userEmail:dataFromToken.email,
                    expenseTypeId:dataFromPostman.expenseTypeId,
                    amount:dataFromPostman.amount,
                    note:dataFromPostman.note
                });
    
               await ob.save();
    
                res.status(200);
                res.send("expense inserted")
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to create expanse");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}





var updateExpense = async (req,res)=>
{
    var dataFromPostman = req.body;
    var myId = req.params.id;
    var tokenFromPostman = req.headers.authorization;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try{
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var accessibility = dataFromToken.accessibility;

            if(accessibility.includes("expense"))
            {
                var data = await expenseModel.updateOne({_id:myId,userEmail:dataFromToken.email},{$set:{amount:dataFromPostman.amount,note:dataFromPostman.note,expenseTypeId:dataFromPostman.expenseTypeId}})
                if(data.modifiedCount==0)
                {
                    res.status(203);
                    res.send("you are trying to update expense with the same information")
                }
                else
                {
                    res.status(200);
                    res.send("expense updated")
                }
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to update supplier");
            }
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }   
    }
}


var expenseList = async (req,res)=>
{
    var myPageNo = Number(req.params.pageNo);
    var myPerPage = Number(req.params.perPage);
    var mySearchKey = req.params.searchKey;
    var skipData = (myPageNo-1)*myPerPage;

    var tokenFromPostman = req.headers.authorization;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var accessibility = dataFromToken.accessibility;

            if(accessibility.includes("expense"))
            {
                if(mySearchKey==="0")
                {
                    var data = await expenseModel.aggregate([
                        {$match:{userEmail:{$eq:dataFromToken.email}}},
                        {$lookup:{from:'expensetypes',localField:'expenseTypeId',foreignField:'_id',as:'typeDetail'}},
                        {
                            $facet :{
                                        "totalData":[{$count:'total'}],
                                        "allData":[{$skip:skipData},{$limit:myPerPage}]
                                    }
                        }
                    ])
                }
                else
                {
                    var data = await expenseModel.aggregate([
                        {$match:{userEmail:{$eq:dataFromToken.email}}},
                        {$lookup:{from:'expensetypes',localField:'expenseTypeId',foreignField:'_id',as:'typeDetail'}},
                        {
                            $facet : {
                                "totalData":[
                                            {
                                                $match:{$or:
                                                            [
                                                            {amount:{$regex:mySearchKey,$options:"i"}},
                                                            {note:{$regex:mySearchKey,$options:"i"}},
                                                            {'typeDetail.name':{$regex:mySearchKey,$options:"i"}}
                                                            ]
                                                        }
                                            },
                                            {$count:'total'}
                                        ],
                                "allData":[
                                            {
                                                $match:{$or:
                                                            [
                                                            {amount:{$regex:mySearchKey,$options:"i"}},
                                                            {note:{$regex:mySearchKey,$options:"i"}},
                                                            {'typeDetail.name':{$regex:mySearchKey,$options:"i"}}
                                                            ]
                                                        }
                                            },
                                            {$skip:skipData},
                                            {$limit:myPerPage}
                                            
                                        ]
                                
                            }
                        }
                    ])
                
                    
                }
    
                res.status(200)
                res.send(data)
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view expense list");
            }
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}



var deleteExpense = async (req,res)=>
{
    var tokenFromPostman = req.headers.authorization;
    var myId = req.params.id;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);
            var accessibility = dataFromToken.accessibility;

            if(accessibility.includes("expense"))
            {
                await expenseModel.deleteMany({_id:myId});

                res.status(200);
                res.send("expense is deleted")
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to delete expense");
            }
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}



var expenseReport = async (req,res)=>
{
    var tokenFromPostman = req.headers.authorization;
    var dataFromPostman = req.body;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var accessibility = dataFromToken.accessibility;

            if(accessibility.includes("expense"))
            {
                var data = await expenseModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{$and:[{createdDate:{$gte:new Date(dataFromPostman.fromDate)}},{createdDate:{$lte:new Date(dataFromPostman.toDate)}}]}},
                    {
                        $facet : {
                                "total":[{$group:{_id:0, totalAmount:{$sum:"$amount"}}}],
                                "data":[{$lookup:{from:'expensetypes',localField:'expenseTypeId',foreignField:'_id',as:'typeDetail'}},]
                        }
                    }
                ])
    
                res.status(200)
                res.send(data)
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to get expense report");
            }


        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}


var expenseSummary = async (req,res)=>
{
    var tokenFromPostman = req.headers.authorization;
    var dataFromPostman = req.body;

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var accessibility = dataFromToken.accessibility;

            
                var data = await expenseModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {
                        $facet : {
                            "total":[{$group:{_id:0, totalAmount:{$sum:"$amount"}}}], 
                            "last30Days":[{$group:{_id:{$dateToString:{date:'$createdDate',format:'%Y-%m-%d'}}, totalAmount:{$sum:"$amount"}}},{$sort:{_id:1}},{$limit:30}]
                        }
                    }
                ])
    
                res.status(200)
                res.send(data)
            
           
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }  
}





var expenseDetailById = async (req,res)=>
{
    var tokenFromPostman = req.headers.authorization;
    var myId = req.params.id;
    

    if(tokenFromPostman=='')
    {
        res.status(203);
        res.send("Token is required")
    }
    else
    {
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);
            var accessibility = dataFromToken.accessibility;

            if(accessibility.includes("expense"))
            {
                var data = await expenseModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{_id:{$eq:mongoose.Types.ObjectId(myId)}}}
                ])
                res.status(200);
                res.send(data);
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view expense detail");
            }
           
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}












router.route('/createExpense')
    .post(createExpense);
router.route('/updateExpense/:id')
    .post(updateExpense);
router.route('/expenseList/:pageNo/:perPage/:searchKey')
    .get(expenseList)
router.route('/deleteExpense/:id')
    .get(deleteExpense)
router.route('/expenseReport')
    .post(expenseReport)
router.route('/expenseSummary')
    .get(expenseSummary)
router.route('/expenseDetailById/:id')
    .get(expenseDetailById)


module.exports=router;

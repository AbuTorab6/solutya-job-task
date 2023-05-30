var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');
var mongoose = require('mongoose')

var expenseTypeModel=require('../models/expenseTypeModel');
var expenseModel = require('../models/expenseModel')

var createExpenseType = async (req,res)=>
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
                var ob = new expenseTypeModel({
                    userEmail:dataFromToken.email,
                    name:dataFromPostman.name
                });
    
                await ob.save();
    
                res.status(200);
                res.send("Expense type is insert success")
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to create expense type");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
    
}



var updateExpenseType = async (req,res)=>
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
        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);
            var accessibility = dataFromToken.accessibility;

            if(accessibility.includes("expense"))
            {
                var data = await expenseTypeModel.updateOne({_id:myId,userEmail:dataFromToken.email},{$set:{name:dataFromPostman.name}})

            
                if(data.modifiedCount==0)
                {
                    res.status(203);
                    res.send("can not update expense type name")
                }
                else
                {
                    res.status(200);
                    res.send("expense type name updated")
                }
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to update expense type");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}








var expenseTypeList = async (req,res)=>
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
                    var data = await expenseTypeModel.aggregate([
                        {$match:{userEmail:{$eq:dataFromToken.email}}},
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
                    var data = await expenseTypeModel.aggregate([
                        {$match:{userEmail:{$eq:dataFromToken.email}}},
                        {
                            $facet : {
                                "totalData":[
                                            {
                                                $match:{$or:
                                                            [
                                                            {name:{$regex:mySearchKey,$options:"i"}},
                                                            ]
                                                        }
                                            },
                                            {$count:'total'}
                                        ],
                                "allData":[
                                            {
                                                $match:{$or:
                                                            [
                                                            {name:{$regex:mySearchKey,$options:"i"}},
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
    
                res.status(200);
                res.send(data)
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view expense type list");
            }

            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}








var expenseTypeDropdown = async (req,res)=>
{
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
            
                var data = await expenseTypeModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$project:{_id:1,name:1}}
                ])
    
                res.status(200);
                res.send(data)
           
            
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}



var deleteExpenseType = async (req,res)=>
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
                var checkAssociation = await expenseModel.find({expenseTypeId:myId})
                if(checkAssociation.length===0)
                {
                    await expenseTypeModel.deleteMany({_id:myId})
                    res.status(200);
                    res.send("expenseType is deleted")
    
                }
                else
                {
                    res.status(206);
                    res.send("you can not delete this expenseType. This expenseType's record is already exist on expense collection !");
                }
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to delete expense type");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}







var expenseTypeDetailById = async (req,res)=>
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
                var data = await expenseTypeModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{_id:{$eq:mongoose.Types.ObjectId(myId)}}}
                ])
                res.status(200);
                res.send(data);
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view expense type detail");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}










router.route('/createExpenseType')
    .post(createExpenseType);
router.route('/updateExpenseType/:id')
    .post(updateExpenseType);
router.route('/expenseTypeList/:pageNo/:perPage/:searchKey')
    .get(expenseTypeList)    
router.route('/expenseTypeDropdown')
    .get(expenseTypeDropdown)
router.route('/deleteExpenseType/:id')
    .get(deleteExpenseType)
router.route('/expenseTypeDetailById/:id')
    .get(expenseTypeDetailById)


module.exports=router;
var mongoose = require('mongoose');
var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');

var sellSummaryModel = require('../models/sellSummaryModel');
var sellDetailModel = require('../models/sellDetailModel')



var createSell = async (req,res)=>
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
	        if(accessibility.includes("sell"))
            {
                var ob = new sellSummaryModel(
                    {
                        userEmail:dataFromToken.email,
                        customerId:dataFromPostman.parent.customerId,
                        vatTax:dataFromPostman.parent.vatTax,
                        discount:dataFromPostman.parent.discount,
                        otherCost:dataFromPostman.parent.otherCost,
                        shippingCost:dataFromPostman.parent.shippingCost,
                        grandTotal:dataFromPostman.parent.grandTotal,
                        note:dataFromPostman.parent.note
                    }
                )
                var parenrInsert = await ob.save();
                
                if(parenrInsert._id)
                {
                    try
                    {
                        dataFromPostman.child.forEach
                        (
                            function(p1,p2,p3)
                            {
                                p1.userEmail=dataFromToken.email,
                                p1.sellSummaryId=parenrInsert._id
                            }
                        )
    
                        var chieldInsert = await sellDetailModel.insertMany(dataFromPostman.child)
                        if(chieldInsert[0]._id)
                        {
                            res.status(200);
                            res.send("sell summary and sell detail inserted")
                        }
                        else
                        {
                            await purchaseSummaryModel.deleteOne({_id:parenrInsert._id})
                            res.status(206);
                            res.send("sell detail(chield) can not insert")
                        }
    
                    }
                    catch(ob)
                    {
                        await sellSummaryModel.deleteOne({_id:parenrInsert._id})
                        res.status(206);
                        res.send(ob.message);
                    }
                }
                else
                {
                    res.status(203);
                    res.send("sell summary(parent) can not insert")
                }
    
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to create sell");
            }

            


        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}




var sellList = async (req,res)=>
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
	        if(accessibility.includes("sell"))
            {

                if(mySearchKey==="0")
            {
                var data = await sellSummaryModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$lookup:{from:'customers',localField:'customerId',foreignField:'_id',as:'customerDetail'}},
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
                var data = await sellSummaryModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$lookup:{from:'customers',localField:'customerId',foreignField:'_id',as:'customerDetail'}},
                    {
                        $facet : {
                            "totalData":[
                                        {
                                            $match:{$or:
                                                        [
                                                        {note:{$regex:mySearchKey,$options:"i"}},
                                                        {'customerDetail.customerName':{$regex:mySearchKey,$options:"i"}},
                                                        {'customerDetail.address':{$regex:mySearchKey,$options:"i"}},
                                                        {'customerDetail.phone':{$regex:mySearchKey,$options:"i"}},
                                                        ]
                                                    }
                                        },
                                        {$count:'total'}
                                    ],
                            "allData":[
                                        {
                                            $match:{$or:
                                                        [
                                                        {note:{$regex:mySearchKey,$options:"i"}},
                                                        {'customerDetail.customerName':{$regex:mySearchKey,$options:"i"}},
                                                        {'customerDetail.address':{$regex:mySearchKey,$options:"i"}},
                                                        {'customerDetail.phone':{$regex:mySearchKey,$options:"i"}},
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
            res.send(data);
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view sell list");
            }

            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}


var deleteSell = async (req,res)=>
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
        // here we are creating the session of Transaction rollback
        const session = await mongoose.startSession();

        try
        {
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            var accessibility = dataFromToken.accessibility;
	        if(accessibility.includes("sell"))
            {

                // Begin Transaction
                await session.startTransaction();


                //first database process
                var childDelete = await sellDetailModel.deleteMany({sellSummaryId:myId}).session(session); // here the session is holding the first database process.

                //2nd database process
                var parentDelete = await sellSummaryModel.deleteMany({_id:myId}).session(session) // here the session is holding the 2nd database process.


                // 2 database prosess that our session is holding are successfully complete then we are ending our session. after that we are sending the response
                await session.commitTransaction();
                session.endSession();

                res.status(200);
                res.send("sell Summary and  sell Detail are deleted")
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to delete sell");
            }
            
        }
        catch(ob)
        {
            //if any one database process is not done then it will undo all the database process that are holding.
            await session.abortTransaction();
            session.endSession();

            res.status(206);
            res.send(ob.message);
        }
    }
}


var sellDetailReport = async (req,res)=>
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
	        if(accessibility.includes("sell"))
            {

                var data = await sellDetailModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{$and:[{createdDate:{$gte:new Date(dataFromPostman.fromDate)}},{createdDate:{$lte:new Date(dataFromPostman.toDate)}}]}},
                    {
                        $facet : {
                                "total":[{$group:{_id:0, totalAmount:{$sum:"$total"}}}],
                                "data":[
                                    {$lookup:{from:'products',localField:'productId',foreignField:'_id',as:'productDetail'}},
                                    {$lookup:{from:'categories',localField:'productDetail.categoryId',foreignField:'_id',as:'categoryDetail'}},
                                    {$lookup:{from:'brands',localField:'productDetail.brandId',foreignField:'_id',as:'brandDetail'}},
                                ]
                        }
                    }
                ])
    
                res.status(200);
                res.send(data);
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to get sell detail report");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}




var sellSummary = async (req,res)=>
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

            
                var data = await sellSummaryModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {
                        $facet : {
                            "total":[{$group:{_id:0, totalAmount:{$sum:"$grandTotal"}}}],
                            "last30Days":[{$group:{_id:{$dateToString:{date:'$createdDate',format:'%Y-%m-%d'}}, totalAmount:{$sum:"$grandTotal"}}},{$sort:{_id:1}},{$limit:30}]
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









router.route('/createSell')
    .post(createSell);
router.route('/sellList/:pageNo/:perPage/:searchKey')
    .get(sellList)
router.route('/deleteSell/:id')
    .get(deleteSell)
router.route('/sellDetailReport')
    .post(sellDetailReport)
router.route('/sellSummary')
    .get(sellSummary)


module.exports=router;
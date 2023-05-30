var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');
var mongoose = require('mongoose')


var supplierModel=require('../models/supplierModel')
var purchaseSummaryModel = require('../models/purchaseSummaryModel')

var createSupplier = async (req,res)=>
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

            if(accessibility.includes("supplier"))
            {
                var ob = new supplierModel({
                    userEmail:dataFromToken.email,
                    supplierName:dataFromPostman.supplierName,
                    address:dataFromPostman.address,
                    phone:dataFromPostman.phone,
                    email:dataFromPostman.email,
                });
    
                await ob.save();
    
                res.status(200);
                res.send("supplier insert success")
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to create supplier");
            }

            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
    
}




var updateSupplier = async (req,res)=>
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

            if(accessibility.includes("supplier"))
            {
                var data = await supplierModel.updateOne({_id:myId,userEmail:dataFromToken.email},{$set:{supplierName:dataFromPostman.supplierName,address:dataFromPostman.address,phone:dataFromPostman.phone,email:dataFromPostman.email}})

            
                if(data.modifiedCount==0)
                {
                    res.status(203);
                    res.send("you are trying to update the supplier with the same information")
                }
                else
                {
                    res.status(200);
                    res.send("supplier  updated")
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








var supplierList = async (req,res)=>
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

            if(accessibility.includes("supplier"))
            {
                if(mySearchKey==="0")
                {
                    var data = await supplierModel.aggregate([
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
                    var data = await supplierModel.aggregate([
                        {$match:{userEmail:{$eq:dataFromToken.email}}},
                        {
                            $facet : {
                                "totalData":[
                                            {
                                                $match:{$or:
                                                            [
                                                            {supplierName:{$regex:mySearchKey,$options:"i"}},
                                                            {address:{$regex:mySearchKey,$options:"i"}},
                                                            {phone:{$regex:mySearchKey,$options:"i"}},
                                                            {email:{$regex:mySearchKey,$options:"i"}}
                                                            ]
                                                        }
                                            },
                                            {$count:'total'}
                                        ],
                                "allData":[
                                            {
                                                $match:{$or:
                                                            [
                                                            {supplierName:{$regex:mySearchKey,$options:"i"}},
                                                            {address:{$regex:mySearchKey,$options:"i"}},
                                                            {phone:{$regex:mySearchKey,$options:"i"}},
                                                            {email:{$regex:mySearchKey,$options:"i"}}
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
                res.send("you are not allowed to view supplier list");
            }

            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}



var supplierDropdown = async (req,res)=>
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

           
                var data = await supplierModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$project:{_id:1,supplierName:1}}
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


var deleteSupplier = async(req,res)=>
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

            if(accessibility.includes("supplier"))
            {
                var checkAssociation = await purchaseSummaryModel.find({supplierId:myId})
                if(checkAssociation.length===0)
                {
                    await supplierModel.deleteMany({_id:myId})
                    res.status(200);
                    res.send("supplier is deleted")
    
                }
                else
                {
                    res.status(206);
                    res.send("you can not delete this supplier. This supplier's record is already exist on purchaseSummary collection !");
                }
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to delete supplier");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}




var supplierDetailById = async (req,res)=>
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

            if(accessibility.includes("supplier"))
            {
                var data = await supplierModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{_id:{$eq:mongoose.Types.ObjectId(myId)}}}
                ])
                res.status(200);
                res.send(data);
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view supplier detail");
            }

            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}












router.route('/createSupplier')
    .post(createSupplier);
router.route('/updateSupplier/:id')
    .post(updateSupplier);
router.route('/supplierList/:pageNo/:perPage/:searchKey')
    .get(supplierList)
router.route('/supplierDropdown')
    .get(supplierDropdown)
router.route('/deleteSupplier/:id')
    .get(deleteSupplier)
router.route('/supplierDetailById/:id')
    .get(supplierDetailById)

module.exports=router;
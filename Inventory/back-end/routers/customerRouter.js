var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');
var mongoose = require('mongoose')

var customerModel= require('../models/customerModel')
var sellSummaryModel = require('../models/sellSummaryModel');


var createCustomer = async (req,res)=>
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

            if(accessibility.includes("customer"))
            {
                var ob = new customerModel({
                    userEmail:dataFromToken.email,
                    customerName:dataFromPostman.customerName,
                    address:dataFromPostman.address,
                    phone:dataFromPostman.phone,
                    email:dataFromPostman.email,
                });
    
                await ob.save();
    
                res.status(200);
                res.send("customer insert success")
            }
            else
            {
                res.status(203);
                res.send("Only Admin can create customer");
            }

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
    
}



var updateCustomer = async (req,res)=>
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

            if(accessibility.includes("customer"))
            {
                var data = await customerModel.updateOne({_id:myId,userEmail:dataFromToken.email},{$set:{customerName:dataFromPostman.customerName,address:dataFromPostman.address,phone:dataFromPostman.phone,email:dataFromPostman.email}})

            
                if(data.modifiedCount==0)
                {
                    res.status(203);
                    res.send("you are trying to update the customer with the same information")
                }
                else
                {
                    res.status(200);
                    res.send("customer name updated")
                }
            }
            else
            {
                res.status(203);
                res.send("Only Admin can update customer");
            }

            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}






var customerList = async (req,res)=>
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

            if(accessibility.includes("customer"))
            {
                if(mySearchKey==="0")
                {
                    var data = await customerModel.aggregate([
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
                    var data = await customerModel.aggregate([
                        {$match:{userEmail:{$eq:dataFromToken.email}}},
                        {
                            $facet : {
                                "totalData":[
                                            {
                                                $match:{$or:
                                                            [
                                                            {customerName:{$regex:mySearchKey,$options:"i"}},
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
                                                            {customerName:{$regex:mySearchKey,$options:"i"}},
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
                res.send("Only Admin can view customer list");
            }

            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}





var customerDropdown = async (req,res)=>
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

            
                var data = await customerModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$project:{_id:1,customerName:1}}
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



var deleteCustomer = async (req,res)=>
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

            if(accessibility.includes("customer"))
            {
                var checkAssociation = await sellSummaryModel.find({customerId:myId})
                if(checkAssociation.length===0)
                {
                    await customerModel.deleteMany({_id:myId})
                    res.status(200);
                    res.send("customer is deleted")
    
                }
                else
                {
                    res.status(206);
                    res.send("you can not delete this customer. This customer's record is already exist on sell Summary collection !");
                }
            }
            else
            {
                res.status(203);
                res.send("Only Admin can delete customer");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}



var customerDetailById = async (req,res)=>
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

            if(accessibility.includes("customer"))
            {
                var data = await customerModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{_id:{$eq:mongoose.Types.ObjectId(myId)}}}
                ])
                res.status(200);
                res.send(data);
            }
            else
            {
                res.status(203);
                res.send("Only Admin can view customer detail");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}





router.route('/createCustomer')
    .post(createCustomer);
router.route('/updateCustomer/:id')
    .post(updateCustomer);
router.route('/customerList/:pageNo/:perPage/:searchKey')
    .get(customerList)
router.route('/customerDropdown')
    .get(customerDropdown)
router.route('/deleteCustomer/:id')
    .get(deleteCustomer)
router.route('/customerDetailById/:id')
    .get(customerDetailById)

module.exports=router;
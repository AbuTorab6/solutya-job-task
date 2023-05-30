var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');
const { mongo, default: mongoose } = require('mongoose');

var brandModel= require('../models/brandModel');
var productModel = require('../models/productModel')


var createBrand = async (req,res)=>
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
	        if(accessibility.includes("product"))
            {
                var ob = new brandModel({
                    userEmail:dataFromToken.email,
                    name:dataFromPostman.name
                });
    
                await ob.save();
    
                res.status(200);
                res.send("Brand insert success")
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to create brand");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
    
}





var updateBrand = async (req,res)=>
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
	        if(accessibility.includes("product"))
            {
                var data = await brandModel.updateOne({_id:myId,userEmail:dataFromToken.email},{$set:{name:dataFromPostman.name}})

            
                if(data.modifiedCount==0)
                {
                    res.status(203);
                    res.send("you are trying to update the brand name with the same information")
                }
                else
                {
                    res.status(200);
                    res.send("brand name updated")
                }
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to update brand");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}




var brandList = async (req,res)=>
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
	        if(accessibility.includes("product"))
            {
                if(mySearchKey==="0")
                {
                    var data = await brandModel.aggregate([
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
                    var data = await brandModel.aggregate([
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
                res.send("you are not allowed to view brand list");
            }
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}


var brandDropdown = async (req,res)=>
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
            
                var data = await brandModel.aggregate([
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

var deleteBrand =async (req,res)=>
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
	        if(accessibility.includes("product"))
            {

                // The brand collection is associate with product collection. So at first we have to check that this brand(that we want to delete by its _id) record is exist on the product collection or not. If exist we can not delete this brand. and if does not exist then we can delete this brand.
                var checkAssociation = await productModel.find({brandId:myId})

                if(checkAssociation.length===0)
                {
                    await brandModel.deleteMany({_id:myId})
                    res.status(200);
                    res.send("brand is deleted")

                }
                else
                {
                    res.status(206);
                    res.send("you can not delete this brand. This brand's record is already exist on product collection !");
                }
            
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to delete brand");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}


var brandDetailById = async (req,res)=>
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
	        if(accessibility.includes("product"))
            {
                var data = await brandModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{_id:{$eq:mongoose.Types.ObjectId(myId)}}}
                ])
                res.status(200);
                res.send(data);
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view brand detail");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}






router.route('/createBrand')
    .post(createBrand);
router.route('/updateBrand/:id')
    .post(updateBrand);
router.route('/brandList/:pageNo/:perPage/:searchKey')
    .get(brandList)
router.route('/brandDropdown')
    .get(brandDropdown)
router.route('/deleteBrand/:id')
    .get(deleteBrand);
router.route('/brandDetailById/:id')
    .get(brandDetailById)

module.exports=router;
var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');
var mongoose = require('mongoose')

var categoryModel = require('../models/categoryModel')
var productModel = require('../models/productModel')


var createCategory = async (req,res)=>
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
                var ob = new categoryModel({
                    userEmail:dataFromToken.email,
                    name:dataFromPostman.name
                });
    
                await ob.save();
    
                res.status(200);
                res.send("Category insert success")
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to create category");
            }
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}


var updateCategory = async (req,res)=>
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
                var data = await categoryModel.updateOne({_id:myId,userEmail:dataFromToken.email},{$set:{name:dataFromPostman.name}})

            
                if(data.modifiedCount==0)
                {
                    res.status(203);
                    res.send("you are trying to  update category name with the same information")
                }
                else
                {
                    res.status(200);
                    res.send("category name updated")
                }
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to update category");
            }
            

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}





var categoryList = async (req,res)=>
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
                var data = await categoryModel.aggregate([
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
                var data = await categoryModel.aggregate([
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
                res.send("you are not allowed to view category list");
            }
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}




var categoryDropdown = async (req,res)=>
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

            
                var data = await categoryModel.aggregate([
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




var deleteCategory = async (req,res)=>
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
                var checkAssociation = await productModel.find({categoryId:myId})

                if(checkAssociation.length===0)
                {
                    await categoryModel.deleteMany({_id:myId})
                    res.status(200);
                    res.send("category is deleted")
    
                }
                else
                {
                    res.status(206);
                    res.send("you can not delete this category. This categories record is exist on product collection !");
                }
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to delete category");
            }
          

        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}



var categoryDetailById = async (req,res)=>
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
                var data = await categoryModel.aggregate([
                    {$match:{userEmail:{$eq:dataFromToken.email}}},
                    {$match:{_id:{$eq:mongoose.Types.ObjectId(myId)}}}
                ])
                res.status(200);
                res.send(data);
    
            }
            else
            {
                res.status(203);
                res.send("you are not allowed to view category detail");
            }
            
        }
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }

}







router.route('/createCategory')
    .post(createCategory);
router.route('/updateCategory/:id')
    .post(updateCategory);
router.route('/categoryList/:pageNo/:perPage/:searchKey')
    .get(categoryList);
router.route('/categoryDropdown')
    .get(categoryDropdown)
router.route('/deleteCategory/:id')
    .get(deleteCategory)
router.route('/categoryDetailById/:id')
    .get(categoryDetailById)

module.exports=router
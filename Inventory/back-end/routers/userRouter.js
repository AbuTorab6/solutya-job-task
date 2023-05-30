var express=require('express');
var app = express();
var router = express.Router();
app.use(express.json());
var jwt= require('jsonwebtoken');

var userModel = require('../models/userModel');
var otpModel = require('../models/otpModel')
var sendEmail = require('../utility/sendEmail')



var registration = async (req,res)=>
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
       try{
            var dataFromToken = jwt.verify(tokenFromPostman,process.env.KEY);

            if(dataFromToken.role=='admin')
            {
                var search = await userModel.find({email:dataFromPostman.email});

                if(search[0]===undefined)
                {
                    try
                    {
                        var ob = new userModel(dataFromPostman);
                        var data = await ob.save();
            
                        res.status(200);
                        res.send("registration successfull");
                        
                    }
                    catch(ob)
                    {
                        res.status(206);
                        res.send(ob.message);
                    }
                }
                else
                {
                    res.status(203);
                    res.send("User with the same email is already exist. Please try with another email.")
                }
                
            }
            else
            {
                res.status(203)
                res.send("only admin can create user");
            }
       }
       catch(ob)
       {
            res.status(206);
            res.send(ob.message);
       }

    }


   
}



var login = async(req,res)=>
{
    var dataFromPostman = req.body;

    var serach = await userModel.find({email:dataFromPostman.email})
    if(serach[0]===undefined)
    {
        res.status(203);
        res.send("Wrong Email!")
    }
    else
    {
        if(serach[0].password===dataFromPostman.password)
        {
            var token = jwt.sign({firstName:serach[0].firstName,lastName:serach[0].lastName,email:dataFromPostman.email,role:serach[0].role,accessibility:serach[0].accessibility},process.env.KEY);


            var detail = await userModel.aggregate([
                {$match:{email:{$eq:dataFromPostman.email}}},
                {$project:{firstName:1,lastName:1,email:1,photo:1,mobile:1,role:1,accessibility:1,_id:0}}
            ])
            res.status(200);
            res.json({token:token,staus:"success",data:detail[0]})
        }
        else
        {
            res.status(203);
			res.send("Wrong Password!")
        }
    }
}



var updateUser = async (req,res)=>
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

            var data = await userModel.updateOne({email:dataFromToken.email},{$set:{firstName:dataFromPostman.firstName,lastName:dataFromPostman.lastName,mobile:dataFromPostman.mobile,password:dataFromPostman.password,photo:dataFromPostman.photo}});

            if(data.modifiedCount==0)
            {
                res.status(203);
                res.send("you are trying to update your profile with the same information")
            }
            else
            {
                res.status(200);
                res.send("profile updated")
            }

        } 
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}



var profileDetail = async (req,res)=>
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

            var data = await userModel.find({email:dataFromToken.email})

            if(data[0]===undefined)
            {
                res.status(203);
                res.send("user does not exist")
            }
            else
            {
                res.status(200);
                res.send(data)
            }

        } 
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
    }
}











var verifyEmail = async (req,res)=>
{
    var myEmail = req.params.email;
    var OTPCode = Math.floor(100000 + Math.random() * 900000)
    try
        {
            var data = await userModel.find({email:myEmail});
            if(data[0]===undefined)
            {
                res.status(203);
                res.send("user does not exist")
            }
            else
            {
                //if the email is exist then we will insert an OTP into the otp collection
                var ob = new otpModel(
                    {
                        email:myEmail,
                        otp:OTPCode,
                    }
                )
                await ob.save();

                //after inserting OTP we will send the 6 digit OTP code to user email
                let email = await sendEmail(myEmail,"Your PIN Code is= "+OTPCode,"Inventory PIN Verification")

                res.status(200);
                res.send("otp successfully send to user email")
            }

        } 
        catch(ob)
        {
            res.status(206);
            res.send(ob.message);
        }
}




var verifyOTPCode = async (req,res)=>
{
    var myEmail = req.params.email;
    var myOtp = req.params.otp;

    try{

        var data = await otpModel.aggregate([
            {$match:{email:{$eq:myEmail}}},
            {$match:{otp:{$eq:myOtp}}}
        ])
        if(data[0]==undefined)
        {
            res.status(203);
            res.send("OTP code or email did not match ");
        }
        else
        {
            if(data[0].status==0)
            {

                await otpModel.updateOne({otp:myOtp,email:myEmail},{$set:{status:1}})

                res.status(200);
                res.send("otp verified")
            }
            else
            {
                res.status(203);
                res.send("This otp code have been used already!");
            }
            
        }
        
    }
    catch(ob)
    {
        res.status(206);
        res.send(ob.message);
    }

}



var resetPassword = async (req,res)=>
{
    var dataFromPostman = req.body;
    
    var myEmail = dataFromPostman.email;
    var myOtp = dataFromPostman.otp;
    var myPassword = dataFromPostman.password;

    try{
        var data = await otpModel.aggregate([
            {$match:{email:{$eq:myEmail}}},
            {$match:{otp:{$eq:myOtp}}}
        ])
        if(data[0]==undefined)
        {
            res.status(203);
            res.send("OTP code or email did not match ");
        }
        else
        {
            if(data[0].status==1)
            {

                var data2 = await userModel.updateOne({email:myEmail},{$set:{password:myPassword}})

                if(data2.modifiedCount==0)
                {
                    res.status(203);
                    res.send("can not update password")
                }
                else
                {
                    res.status(200);
                    res.send("password reset success")
                }
            }
            else
            {
                res.status(203);
                res.send("invalid otp");
            }
            
        }
        
    }
    catch(ob)
    {
        res.status(206);
        res.send(ob.message);
    }

}

var getAllUser = async (req,res)=>
{
    

    try
    {
        var data = await userModel.updateOne({email:"juboraz727@gmail.com"},{$set:{accessibility:["createUser","dashboard","customer","supplier","expense","product","purchase","sell","return","report"]}});

        res.status(200)
        res.send(data)
    }
    catch(ob)
    {
        res.status(200)
        res.send(ob.message)
    }
}





router.route('/registration')
    .post(registration);
router.route('/login')
    .post(login)
router.route('/updateUser')
    .post(updateUser)
router.route('/profileDetail')
    .get(profileDetail)
router.route('/verifyEmail/:email')
    .get(verifyEmail)
router.route('/verifyOTPCode/:email/:otp')
    .get(verifyOTPCode)
router.route('/resetPassword')
    .post(resetPassword)
router.route('/updateUser')
    .get(getAllUser)


module.exports=router;
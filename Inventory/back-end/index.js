let dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const express = require('express');
const app = express();
const mongoose = require('mongoose');

var userRouter = require('./routers/userRouter');
var brandRouter = require('./routers/brandRouter')
var categoryRouter = require('./routers/categoryRouter')
var customerRouter = require('./routers/customerRouter');
var supplierRouter = require('./routers/supplierRouter')
var expenseTypeRouter = require('./routers/expenseTypeRouter')
var expenseRouter = require('./routers/expenseRouter')
var productRouter = require('./routers/productRouter')
var purchaseRouter = require('./routers/purchaseRouter')
var sellRouter = require('./routers/sellRouter')
var returnRouter = require('./routers/returnRouter')

/*========================================*/
/*============security package=============*/
/*=========================================*/
var cors = require('cors');
var mongoSanitize = require('express-mongo-sanitize');
var helmet = require('helmet');
var hpp = require('hpp');
var xssClean = require('xss-clean');
var  rateLimit = require('express-rate-limit');

/*here we have to increase the size of request body. When Client site send image as base64 format the string of base64 for image is too large. Normaly the request body of server site can not carry large string. Thats why we have to increase the size of request body*/

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));





app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xssClean());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, 
	legacyHeaders: false, 
})
app.use(limiter)





/*========================================*/
/*================Routing=================*/
/*========================================*/
app.use('/',userRouter);
app.use('/',brandRouter);
app.use('/',categoryRouter);
app.use('/',customerRouter);
app.use('/',supplierRouter);
app.use('/',expenseTypeRouter);
app.use('/',expenseRouter);
app.use('/',productRouter);
app.use('/',purchaseRouter);
app.use('/',sellRouter);
app.use('/',returnRouter)

app.use('*',(req,res)=>{
    res.status(404);
    res.send("Sorry! Wrong url");
})




/*========================================*/
/*======mongoDB Database connection=======*/
/*========================================*/

var URI = 'mongodb+srv://<username>:<password>@cluster0.rl4dqmo.mongodb.net/solutyaDB?retryWrites=true&w=majority';
//mongodb://localhost:27017/solutyaDB
//mongodb+srv://<username>:<password>@cluster0.rl4dqmo.mongodb.net/solutyaDB?retryWrites=true&w=majority
var OPTION = {
    user:'secret',
    pass:'secret',
    autoIndex:true
}

mongoose.connect(URI,OPTION,{useNewUrlParser:true,useUnifiedTopology:true}).then
(
    (res)=>
    {
        console.log("connection established")
    }
).catch
(
    (err)=>{
        console.log("connection failed");
        console.log(err);
    }
)


app.listen(5000);

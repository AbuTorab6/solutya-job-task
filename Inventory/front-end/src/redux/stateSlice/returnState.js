import {createSlice} from '@reduxjs/toolkit';

var returnState = createSlice(
    {
        name:"returnState",
        initialState:{
            total:0,
            allReturn:[],
            returnReportTotal:0,
            returnReportData:[],
            returnDetail:[],
            allCustomer:[],
            allProduct:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllReturnFunc:(p1,data)=>
            {
                p1.allReturn=data.payload
            },
            setReturnReportTotal:(p1,data)=>
            {
                p1.returnReportTotal=data.payload
            },
            setReturnReportData:(p1,data)=>
            {
                p1.returnReportData=data.payload
            },
            addReturnDetail:(p1,data)=>
            {
                p1.returnDetail.push(data.payload)
            },
            removeReturnDetail:(p1,data)=>
            {
                p1.returnDetail.splice(data.payload,1);
            },
            emptyReturnDetail:(p1)=>
            {
                p1.returnDetail=[]
            },
            setAllCustomerFunc:(p1,data)=>
            {
                p1.allCustomer=data.payload
            },
            setAllProductFunc:(p1,data)=>
            {
                p1.allProduct=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllReturnFunc,setReturnReportTotal,setReturnReportData,addReturnDetail,removeReturnDetail,setAllCustomerFunc,setAllProductFunc,emptyReturnDetail} = returnState.actions;
export default returnState.reducer;
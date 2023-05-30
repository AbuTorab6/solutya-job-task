import {createSlice} from '@reduxjs/toolkit';

var sellState = createSlice(
    {
        name:"sellState",
        initialState:{
            total:0,
            allSell:[],
            sellReportTotal:0,
            sellReportData:[],
            sellDetail:[],
            allCustomer:[],
            allProduct:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllSellFunc:(p1,data)=>
            {
                p1.allSell=data.payload
            },
            setSellReportTotal:(p1,data)=>
            {
                p1.sellReportTotal=data.payload
            },
            setSellReportData:(p1,data)=>
            {
                p1.sellReportData=data.payload
            },
            addSellDetail:(p1,data)=>
            {
                p1.sellDetail.push(data.payload)
            },
            removeSellDetail:(p1,data)=>
            {
                p1.sellDetail.splice(data.payload,1);
            },
            emptySellDetail:(p1)=>
            {
                p1.sellDetail=[]
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

export const {setTotalFunc,setAllSellFunc,setSellReportTotal,setSellReportData,addSellDetail,removeSellDetail,setAllCustomerFunc,setAllProductFunc,emptySellDetail} = sellState.actions;
export default sellState.reducer;
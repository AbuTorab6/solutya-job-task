import {createSlice} from '@reduxjs/toolkit';

var dashboardState = createSlice(
    {
        name:"dashboardState",
        initialState:{
            expenseTotal:0,
            purchaseTotal:0,
            returnTotal:0,
            sellTotal:0,
            expenseChart:[],
            purchaseChart:[],
            returnChart:[],
            sellChart:[],
        },
        reducers:{
            setExpenseTotalFunc:(p1,data)=>
            {
                p1.expenseTotal=data.payload;
            },
            setPurchaseTotalFunc:(p1,data)=>
            {
                p1.purchaseTotal=data.payload;
            },
            setReturnTotalFunc:(p1,data)=>
            {
                p1.returnTotal=data.payload;
            },
            setSellTotalFunc:(p1,data)=>
            {
                p1.sellTotal=data.payload;
            },
            setExpenseChartFunc:(p1,data)=>
            {
                p1.expenseChart=data.payload;
            },
            setPurchaseChartFunc:(p1,data)=>
            {
                p1.purchaseChart=data.payload;
            },
            setReturnChartFunc:(p1,data)=>
            {
                p1.returnChart=data.payload;
            },
            setSellChartFunc:(p1,data)=>
            {
                p1.sellChart=data.payload;
            },
        }
    }
)

export const {setExpenseTotalFunc,setPurchaseTotalFunc,setReturnTotalFunc,setSellTotalFunc,setExpenseChartFunc,setPurchaseChartFunc,setReturnChartFunc,setSellChartFunc} = dashboardState.actions;
export default dashboardState.reducer;
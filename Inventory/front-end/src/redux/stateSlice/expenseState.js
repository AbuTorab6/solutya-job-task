import {createSlice} from '@reduxjs/toolkit';

var expenseState = createSlice(
    {
        name:"expenseState",
        initialState:{
            total:0,
            allExpense:[],
            allExpenseType:[],
            reportTotal:0,
            reportData:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllExpenseFunc:(p1,data)=>
            {
                p1.allExpense=data.payload
            },
            setAllExpenseTypeFunc:(p1,data)=>
            {
                p1.allExpenseType=data.payload;
            },
            setReportTotal:(p1,data)=>
            {
                p1.reportTotal=data.payload
            },
            setReportData:(p1,data)=>
            {
                p1.reportData=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllExpenseFunc,setAllExpenseTypeFunc,setReportTotal,setReportData} = expenseState.actions;
export default expenseState.reducer;
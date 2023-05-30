import {createSlice} from '@reduxjs/toolkit';

var expenseTypeState = createSlice(
    {
        name:"expenseTypeState",
        initialState:{
            total:0,
            allExpenseType:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllExpenseTypeFunc:(p1,data)=>
            {
                p1.allExpenseType=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllExpenseTypeFunc} = expenseTypeState.actions;
export default expenseTypeState.reducer;
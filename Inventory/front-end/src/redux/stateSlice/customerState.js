import {createSlice} from '@reduxjs/toolkit';

var customerState = createSlice(
    {
        name:"customerState",
        initialState:{
            total:0,
            allCustomer:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllCustomerFunc:(p1,data)=>
            {
                p1.allCustomer=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllCustomerFunc} = customerState.actions;
export default customerState.reducer;
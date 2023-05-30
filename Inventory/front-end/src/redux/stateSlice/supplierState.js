import {createSlice} from '@reduxjs/toolkit';

var supplierState = createSlice(
    {
        name:"supplierState",
        initialState:{
            total:0,
            allSupplier:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllSupplierFunc:(p1,data)=>
            {
                p1.allSupplier=data.payload;
            }
        }
    }
)

export const {setTotalFunc,setAllSupplierFunc} = supplierState.actions;
export default supplierState.reducer;
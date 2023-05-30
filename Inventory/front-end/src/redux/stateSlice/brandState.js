import {createSlice} from '@reduxjs/toolkit';

var brandState = createSlice(
    {
        name:"brandState",
        initialState:{
            total:0,
            allBrand:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllBrandFunc:(p1,data)=>
            {
                p1.allBrand=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllBrandFunc} = brandState.actions;
export default brandState.reducer;
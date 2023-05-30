import {createSlice} from '@reduxjs/toolkit';

var categoryState = createSlice(
    {
        name:"categoryState",
        initialState:{
            total:0,
            allCategory:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllCategoryFunc:(p1,data)=>
            {
                p1.allCategory=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllCategoryFunc} = categoryState.actions;
export default categoryState.reducer;
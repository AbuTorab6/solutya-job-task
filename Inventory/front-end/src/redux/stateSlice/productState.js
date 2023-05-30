import {createSlice} from '@reduxjs/toolkit';

var productState = createSlice(
    {
        name:"productState",
        initialState:{
            total:0,
            allProduct:[],
            allProductBrand:[],
            allProductCategory:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllProductFunc:(p1,data)=>
            {
                p1.allProduct=data.payload
            },
            setAllProductBrandFunc:(p1,data)=>
            {
                p1.allProductBrand=data.payload
            },
            setAllProductCategoryFunc:(p1,data)=>
            {
                p1.allProductCategory=data.payload
            },
        }
    }
)

export const {setTotalFunc,setAllProductFunc,setAllProductBrandFunc,setAllProductCategoryFunc} = productState.actions;
export default productState.reducer;
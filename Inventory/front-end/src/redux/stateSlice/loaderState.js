import {createSlice} from '@reduxjs/toolkit'

var loaderState = createSlice(
    {
        name:"loaderState",
        initialState:{
            visibility:"visibility-none"
        },
        reducers:{
            showLoader:(p1)=>
            {
                p1.visibility="visibility-yes"
            },
            hideLoader:(p1)=>
            {
                p1.visibility="visibility-none"
            }
        }
    }
)


export const {showLoader,hideLoader} = loaderState.actions;
export default loaderState.reducer;
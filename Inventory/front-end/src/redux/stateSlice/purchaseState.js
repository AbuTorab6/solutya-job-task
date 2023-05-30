import {createSlice} from '@reduxjs/toolkit';

var purchaseState = createSlice(
    {
        name:"purchaseState",
        initialState:{
            total:0,
            allPurchase:[],
            purchaseReportTotal:0,
            purchaseReportData:[],
            purchaseDetail:[],
            allSupplier:[],
            allProduct:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllPurchaseFunc:(p1,data)=>
            {
                p1.allPurchase=data.payload
            },
            setPurchaseReportTotal:(p1,data)=>
            {
                p1.purchaseReportTotal=data.payload
            },
            setPurchaseReportData:(p1,data)=>
            {
                p1.purchaseReportData=data.payload
            },
            addPurchaseDetail:(p1,data)=>
            {
                p1.purchaseDetail.push(data.payload)
            },
            removePurchaseDetail:(p1,data)=>
            {
                p1.purchaseDetail.splice(data.payload,1);
            },
            emptyPurchaseDetail:(p1)=>
            {
                p1.purchaseDetail=[]
            },
            setAllSupplierFunc:(p1,data)=>
            {
                p1.allSupplier=data.payload
            },
            setAllProductFunc:(p1,data)=>
            {
                p1.allProduct=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllPurchaseFunc,setPurchaseReportTotal,setPurchaseReportData,addPurchaseDetail,removePurchaseDetail,setAllProductFunc,setAllSupplierFunc,emptyPurchaseDetail} = purchaseState.actions;
export default purchaseState.reducer;
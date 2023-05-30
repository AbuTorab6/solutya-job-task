import {configureStore} from '@reduxjs/toolkit'

import loaderState from '../stateSlice/loaderState'
import brandState from '../stateSlice/brandState'
import categoryState from '../stateSlice/categoryState'
import supplierState from '../stateSlice/supplierState'
import customerState from '../stateSlice/customerState'
import expenseTypeState from '../stateSlice/expenseTypeState'
import expenseState from '../stateSlice/expenseState'
import productState from '../stateSlice/productState'
import purchaseState from '../stateSlice/purchaseState'
import sellState from '../stateSlice/sellState'
import returnState from '../stateSlice/returnState'
import dashboardState from '../stateSlice/dashboardState'

export default configureStore(
    {
        reducer:{
            loaderState,
            brandState,
            categoryState,
            supplierState,
            customerState,
            expenseTypeState,
            expenseState,
            productState,
            purchaseState,
            sellState,
            returnState,
            dashboardState
        }
    }
)
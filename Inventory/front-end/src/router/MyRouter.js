import React,{Fragment} from 'react';

import {Routes,Route,BrowserRouter} from 'react-router-dom'

import DashboardPage from '../pages/dashboard/DashboardPage';
import RegistrationPage from '../pages/registration/RegistrationPage';
import LoginPage from '../pages/login/LoginPage';

import ProfilePage from '../pages/profile/ProfilePage';
import BrandListPage from '../pages/brand/BrandListPage';
import CategoryListPage from '../pages/category/CategoryListPage';
import SupplierListPage from '../pages/supplier/SupplierListPage';
import CustomerListPage from '../pages/customer/CustomerListPage';
import ExpenseTypeListPage from '../pages/expenseType/ExpenseTypeListPage';
import ExpenseListPage from '../pages/expense/ExpenseListPage';
import ProductListPage from '../pages/product/ProductListPage';
import PurchaseListPage from '../pages/purchase/PurchaseListPage';
import SellListPage from '../pages/sell/SellListPage';
import ReturnListPage from '../pages/return/ReturnListPage';

import CustomerCreateUpdatePage from '../pages/customer/CustomerCreateUpdatePage';
import SupplierCreateUpdatePage from '../pages/supplier/SupplierCreateUpdatePage';
import ExpenseTypeCreateUpdatePage from '../pages/expenseType/ExpenseTypeCreateUpdatePage';
import BrandCreateUpdatePage from '../pages/brand/BrandCreateUpdatePage';
import CategoryCreateUpdatePage from '../pages/category/CategoryCreateUpdatePage';

import ExpenseCreateUpdatePage from '../pages/expense/ExpenseCreateUpdatePage';
import ProductCreateUpdatePage from '../pages/product/ProductCreateUpdatePage';

import ExpenseReportPage from '../pages/report/ExpenseReportPage';
import PurchaseReportPage from '../pages/report/PurchaseReportPage';
import ReturnReportPage from '../pages/report/ReturnReportPage';
import SellReportPage from '../pages/report/SellReportPage';

import SellCreateUpdatePage from '../pages/sell/SellCreateUpdatePage';
import ReturnCreateUpdatePage from '../pages/return/ReturnCreateUpdatePage';
import PurchaseCreateUpdatePage from '../pages/purchase/PurchaseCreateUpdatePage';

import SendOTP from '../components/forgotPassword/SendOTP';
import VerifyOTP from '../components/forgotPassword/VerifyOTP';
import NewPassword from '../components/forgotPassword/NewPassword';

const MyRouter = () => 
{

    if(localStorage.getItem('token') && JSON.parse(localStorage.getItem('userDetail')).role=='admin')
    {
        return (
            <Fragment>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<DashboardPage/>}/>
                            
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/createUser' element={<RegistrationPage/>}/>
                            <Route path='/profile' element={<ProfilePage/>}/>

                            <Route path='/brandList' element={<BrandListPage/>}/>
                            <Route path='/categoryList' element={<CategoryListPage/>}/>
                            <Route path='/supplierList' element={<SupplierListPage/>}/>
                            <Route path='/customerList' element={<CustomerListPage/>}/>
                            <Route path='/expenseTypeList' element={<ExpenseTypeListPage/>}/>
                            <Route path='/expenseList' element={<ExpenseListPage/>}/>
                            <Route path='/productList' element={<ProductListPage/>}/>
                            <Route path='/purchaseList' element={<PurchaseListPage/>}/>
                            <Route path='/sellList' element={<SellListPage/>}/>
                            <Route path='/returnList' element={<ReturnListPage/>}/>

                            <Route path='/customerCreateUpdate' element={<CustomerCreateUpdatePage/>}/>
                            <Route path='/customerCreateUpdate/:id' element={<CustomerCreateUpdatePage/>}/>

                            <Route path='/supplierCreateUpdate' element={<SupplierCreateUpdatePage/>}/>
                            <Route path='/supplierCreateUpdate/:id' element={<SupplierCreateUpdatePage/>}/>

                            <Route path='/expenseTypeCreateUpdate' element={<ExpenseTypeCreateUpdatePage/>}/>
                            <Route path='/expenseTypeCreateUpdate/:id' element={<ExpenseTypeCreateUpdatePage/>}/>

                            <Route path='/brandCreateUpdate' element={<BrandCreateUpdatePage/>}/>
                            <Route path='/brandCreateUpdate/:id' element={<BrandCreateUpdatePage/>}/>

                            <Route path='/categoryCreateUpdate' element={<CategoryCreateUpdatePage/>}/>
                            <Route path='/categoryCreateUpdate/:id' element={<CategoryCreateUpdatePage/>}/>

                            <Route path='/expenseCreateUpdate' element={<ExpenseCreateUpdatePage/>}/>
                            <Route path='/expenseCreateUpdate/:id' element={<ExpenseCreateUpdatePage/>}/>

                            <Route path='/productCreateUpdate' element={<ProductCreateUpdatePage/>}/>
                            <Route path='/productCreateUpdate/:id' element={<ProductCreateUpdatePage/>}/>

                            <Route path='/expenseReport' element={<ExpenseReportPage/>}/>
                            <Route path='/purchaseDetailReport' element={<PurchaseReportPage/>}/>
                            <Route path='/returnDetailReport' element={<ReturnReportPage/>}/>
                            <Route path='/sellDetailReport' element={<SellReportPage/>}/>

                            <Route path='/sellCreateUpdate' element={<SellCreateUpdatePage/>}/>
                            <Route path='/returnCreateUpdate' element={<ReturnCreateUpdatePage/>}/>
                            <Route path='/purchaseCreateUpdate' element={<PurchaseCreateUpdatePage/>}/>

                            

                        </Routes>
                    </BrowserRouter>
            </Fragment>
        );
    }
    else if(localStorage.getItem('token'))
    {
        return (
            <Fragment>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<DashboardPage/>}/>
                            
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/createUser' element={<DashboardPage/>}/>
                            <Route path='/profile' element={<ProfilePage/>}/>

                            <Route path='/brandList' element={<BrandListPage/>}/>
                            <Route path='/categoryList' element={<CategoryListPage/>}/>
                            <Route path='/supplierList' element={<SupplierListPage/>}/>
                            <Route path='/customerList' element={<CustomerListPage/>}/>
                            <Route path='/expenseTypeList' element={<ExpenseTypeListPage/>}/>
                            <Route path='/expenseList' element={<ExpenseListPage/>}/>
                            <Route path='/productList' element={<ProductListPage/>}/>
                            <Route path='/purchaseList' element={<PurchaseListPage/>}/>
                            <Route path='/sellList' element={<SellListPage/>}/>
                            <Route path='/returnList' element={<ReturnListPage/>}/>

                            <Route path='/customerCreateUpdate' element={<CustomerCreateUpdatePage/>}/>
                            <Route path='/customerCreateUpdate/:id' element={<CustomerCreateUpdatePage/>}/>

                            <Route path='/supplierCreateUpdate' element={<SupplierCreateUpdatePage/>}/>
                            <Route path='/supplierCreateUpdate/:id' element={<SupplierCreateUpdatePage/>}/>

                            <Route path='/expenseTypeCreateUpdate' element={<ExpenseTypeCreateUpdatePage/>}/>
                            <Route path='/expenseTypeCreateUpdate/:id' element={<ExpenseTypeCreateUpdatePage/>}/>

                            <Route path='/brandCreateUpdate' element={<BrandCreateUpdatePage/>}/>
                            <Route path='/brandCreateUpdate/:id' element={<BrandCreateUpdatePage/>}/>

                            <Route path='/categoryCreateUpdate' element={<CategoryCreateUpdatePage/>}/>
                            <Route path='/categoryCreateUpdate/:id' element={<CategoryCreateUpdatePage/>}/>

                            <Route path='/expenseCreateUpdate' element={<ExpenseCreateUpdatePage/>}/>
                            <Route path='/expenseCreateUpdate/:id' element={<ExpenseCreateUpdatePage/>}/>

                            <Route path='/productCreateUpdate' element={<ProductCreateUpdatePage/>}/>
                            <Route path='/productCreateUpdate/:id' element={<ProductCreateUpdatePage/>}/>

                            <Route path='/expenseReport' element={<ExpenseReportPage/>}/>
                            <Route path='/purchaseDetailReport' element={<PurchaseReportPage/>}/>
                            <Route path='/returnDetailReport' element={<ReturnReportPage/>}/>
                            <Route path='/sellDetailReport' element={<SellReportPage/>}/>

                            <Route path='/sellCreateUpdate' element={<SellCreateUpdatePage/>}/>
                            <Route path='/returnCreateUpdate' element={<ReturnCreateUpdatePage/>}/>
                            <Route path='/purchaseCreateUpdate' element={<PurchaseCreateUpdatePage/>}/>

                            

                        </Routes>
                    </BrowserRouter>
            </Fragment>
        );
    }
    else
    {
        return (
            <Fragment>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<LoginPage/>}/>
                            
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/registration' element={<RegistrationPage/>}/>

                            <Route path='/sendOTP' element={<SendOTP/>}/>
                            <Route path='/verifyOTP' element={<VerifyOTP/>}/>
                            <Route path='/newPassword' element={<NewPassword/>}/>

                            <Route path='*' element={<LoginPage/>}/>
                        </Routes>
                    </BrowserRouter>
            </Fragment>
        );
    }

    
};

export default MyRouter;
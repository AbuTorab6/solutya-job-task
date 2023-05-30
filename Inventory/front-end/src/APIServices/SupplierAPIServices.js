import axios from 'axios';
import cogoToast from 'cogo-toast';

import store from '../redux/storage/store'
import { showLoader,hideLoader } from '../redux/stateSlice/loaderState';


var baseURL = "https://vercel-solyuta-inventory.vercel.app"

// https://vercel-deploy-pink.vercel.app
// http://localhost:5000



var axiosHeader = {
    headers:{
        "authorization":localStorage.getItem('token')
    } 
}


var supplierList = (pageNo,perPage,searchKey)=>
{
    //console.log(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey);
    return axios.get(baseURL+'/supplierList/'+pageNo+'/'+perPage+'/'+searchKey,axiosHeader).then
    (
        (res)=>
        {
            if(res.status===200)
            {
                if(res.data[0].allData.length==0)
                {
                    return res.data;
                }
                else
                {
                    return res.data;
                }
            }
            else if(res.status===206)
            {
                cogoToast.warn(res.data);
                return false
            }
            else if(res.status===203)
            {
                cogoToast.warn(res.data);
                return false
            }
            else
            {
                cogoToast.warn("something is wrong.Can not display the supplier list.");
                return false
            }
        }
    ).catch
    (
        (err)=>
        {
            cogoToast.error("Something is wrong:"+err.message);
            return false;
        }
    )
}






var createSupplier = (supplierName,phone,email,address)=>
{
    store.dispatch(showLoader())

    var data = {
        supplierName:supplierName,
        phone:phone,
        email:email,
        address:address
    }

    return axios.post(baseURL+'/createSupplier',data,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return true
            }
            else if(res.status===206)
            {
                cogoToast.warn(res.data);
                return false
            }
            else if(res.status===203)
            {
                cogoToast.warn(res.data);
                return false
            }
            else
            {
                cogoToast.warn("can not create the supplier.");
                return false
            }

        }
    ).catch
    (
        (err)=>
        {
            store.dispatch(hideLoader())
            cogoToast.error("Something is wrong:"+err.message);
            return false;
        }
    )

}



var supplierDetailById = (id)=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/supplierDetailById/'+id,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return res.data;
            }
            else if(res.status===206)
            {
                cogoToast.warn(res.data);
                return false
            }
            else if(res.status===203)
            {
                cogoToast.warn(res.data);
                return false
            }
            else
            {
                cogoToast.warn("can not show the supplier detail");
                return false
            }
        }
    ).catch
    (
        (err)=>
        {
            store.dispatch(hideLoader())
            cogoToast.error("Something is wrong:"+err.message);
            return false;
        }
    )
}


var updateSupplier = (supplierName,phone,email,address,id)=>
{
    store.dispatch(showLoader())
    var data = {
        supplierName:supplierName,
        phone:phone,
        email:email,
        address:address
    }

    return axios.post(baseURL+'/updateSupplier/'+id,data,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return true
            }
            else if(res.status===206)
            {
                cogoToast.warn(res.data);
                return false
            }
            else if(res.status===203)
            {
                cogoToast.warn(res.data);
                return false
            }
            else
            {
                cogoToast.warn("can not update supplier");
                return false
            }
        }
    ).catch
    (
        (err)=>
        {
            store.dispatch(hideLoader())
            cogoToast.error("Something is wrong:"+err.message);
            return false;
        }
    )
}



var deleteSupplier = (id)=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/deleteSupplier/'+id,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return true
            }
            else if(res.status===206)
            {
                cogoToast.warn(res.data);
                return false
            }
            else if(res.status===203)
            {
                cogoToast.warn(res.data);
                return false
            }
            else
            {
                cogoToast.warn("can not delete customer");
                return false
            }
        }
    ).catch
    (
        (err)=>
        {
            store.dispatch(hideLoader())
            cogoToast.error("Something is wrong:"+err.message);
            return false;
        }
    )
}



export {supplierList,createSupplier,supplierDetailById,updateSupplier,deleteSupplier};
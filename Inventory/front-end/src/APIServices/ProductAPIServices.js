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


var productList = (pageNo,perPage,searchKey)=>
{
    //console.log(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey);
    return axios.get(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey,axiosHeader).then
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
                cogoToast.warn("something is wrong.Can not display the product list.");
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



var brandDropdown = ()=>
{
    return axios.get(baseURL+'/brandDropdown',axiosHeader).then
    (
        (res)=>
        {
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
                cogoToast.warn("something is wrong.Can not display the brand dropdown.");
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


var categoryDropdown = ()=>
{
    return axios.get(baseURL+'/categoryDropdown',axiosHeader).then
    (
        (res)=>
        {
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
                cogoToast.warn("something is wrong.Can not display the category Dropdown.");
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




var createProduct = (categoryId,brandId,name,unit,details)=>
{
    store.dispatch(showLoader())

    var data = {
        categoryId:categoryId,
        brandId:brandId,
        name:name,
        unit:unit,
        details:details
    }

    return axios.post(baseURL+'/createProduct',data,axiosHeader).then
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
                cogoToast.warn("can not create the product.");
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



var productDetailById = (id)=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/productDetailById/'+id,axiosHeader).then
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
                cogoToast.warn("can not show the product detail");
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





var updateProduct = (categoryId,brandId,name,unit,details,id)=>
{
    store.dispatch(showLoader())
    var data = {
        categoryId:categoryId,
        brandId:brandId,
        name:name,
        unit:unit,
        details:details
    }

    return axios.post(baseURL+'/updateProduct/'+id,data,axiosHeader).then
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
                cogoToast.warn("can not update product");
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





var deleteProduct = (id)=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/deleteProduct/'+id,axiosHeader).then
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
                cogoToast.warn("can not delete product");
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







export {productList,brandDropdown,categoryDropdown,createProduct,productDetailById,updateProduct,deleteProduct};
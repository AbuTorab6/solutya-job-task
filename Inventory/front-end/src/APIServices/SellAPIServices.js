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


var sellList = (pageNo,perPage,searchKey)=>
{
    //console.log(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey);
    return axios.get(baseURL+'/sellList/'+pageNo+'/'+perPage+'/'+searchKey,axiosHeader).then
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
                cogoToast.warn("something is wrong.Can not display the sell list.");
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




var customerDropdown = ()=>
{
    return axios.get(baseURL+'/customerDropdown',axiosHeader).then
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
                cogoToast.warn("something is wrong.Can not display the customer dropdown.");
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

var productDropDown = ()=>
{
    return axios.get(baseURL+'/productDropDown',axiosHeader).then
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
                cogoToast.warn("something is wrong.Can not display the customer dropdown.");
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



var createSell = (parent,child)=>
{
    store.dispatch(showLoader())

    var data = {
        parent:parent,
        child:child
    }


    return axios.post(baseURL+'/createSell',data,axiosHeader).then
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
                cogoToast.warn("can not create the sell.");
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





var deleteSell = (id)=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/deleteSell/'+id,axiosHeader).then
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
                cogoToast.warn("can not delete the sell");
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

export {sellList,customerDropdown,productDropDown,createSell,deleteSell};
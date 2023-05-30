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




var expenseReport = (fromDate,toDate)=>
{
    store.dispatch(showLoader())
    var data = {
        fromDate:fromDate,
        toDate:toDate
    }


    return axios.post(baseURL+'/expenseReport',data,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return res.data
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
                cogoToast.warn("can not show the expense report");
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







var purchaseDetailReport = (fromDate,toDate)=>
{
    store.dispatch(showLoader())
    var data = {
        fromDate:fromDate,
        toDate:toDate
    }


    return axios.post(baseURL+'/purchaseDetailReport',data,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return res.data
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
                cogoToast.warn("can not show the purchase detail report");
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




var returnDetailReport = (fromDate,toDate)=>
{
    store.dispatch(showLoader())
    var data = {
        fromDate:fromDate,
        toDate:toDate
    }


    return axios.post(baseURL+'/returnDetailReport',data,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return res.data
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
                cogoToast.warn("can not show the return detail report");
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




var sellDetailReport = (fromDate,toDate)=>
{
    store.dispatch(showLoader())
    var data = {
        fromDate:fromDate,
        toDate:toDate
    }


    return axios.post(baseURL+'/sellDetailReport',data,axiosHeader).then
    (
        (res)=>
        {
            store.dispatch(hideLoader())
            if(res.status===200)
            {
                return res.data
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
                cogoToast.warn("can not show the sell detail report");
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









export {expenseReport,purchaseDetailReport,returnDetailReport,sellDetailReport};
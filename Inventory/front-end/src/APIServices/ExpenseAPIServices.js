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


var expenseList = (pageNo,perPage,searchKey)=>
{
    //console.log(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey);
    return axios.get(baseURL+'/expenseList/'+pageNo+'/'+perPage+'/'+searchKey,axiosHeader).then
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
                cogoToast.warn("something is wrong.Can not display the expense list.");
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



var expenseTypeDropdown = ()=>
{
    return axios.get(baseURL+'/expenseTypeDropdown',axiosHeader).then
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
                cogoToast.warn("something is wrong.Can not display the expense type dropdown.");
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




var createExpense = (expenseTypeId,amount,note)=>
{
    store.dispatch(showLoader())

    var data = {
        expenseTypeId:expenseTypeId,
        amount:amount,
        note:note,
    }

    return axios.post(baseURL+'/createExpense',data,axiosHeader).then
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
                cogoToast.warn("can not create the expense.");
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





var expenseDetailById = (id)=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/expenseDetailById/'+id,axiosHeader).then
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
                cogoToast.warn("can not show the expense detail");
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




var updateExpense = (expenseTypeId,amount,note,id)=>
{
    store.dispatch(showLoader())
    var data = {
        expenseTypeId:expenseTypeId,
        amount:amount,
        note:note,
    }

    return axios.post(baseURL+'/updateExpense/'+id,data,axiosHeader).then
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
                cogoToast.warn("can not update expense");
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


var deleteExpense = (id)=>
{
    store.dispatch(showLoader())
    return axios.get(baseURL+'/deleteExpense/'+id,axiosHeader).then
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
                cogoToast.warn("can not delete expense");
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



export {expenseList,expenseTypeDropdown,createExpense,expenseDetailById,updateExpense,deleteExpense};
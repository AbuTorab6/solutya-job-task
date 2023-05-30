import React,{Fragment,useState,useEffect} from 'react';

import cogoToast from 'cogo-toast';


import {useDispatch,useSelector} from 'react-redux';

import { createCustomer,customerDetailById,updateCustomer } from '../../APIServices/CustomerAPIServices';
import {useNavigate,useParams} from 'react-router-dom'

import Zoom from 'react-reveal/Zoom';


const CustomerCreateUpdate = () => 
{
    var navigate = useNavigate();

    var idFromUrl = useParams().id;


    useEffect(()=>{

        if(idFromUrl!==undefined)
        {
            customerDetailById(idFromUrl).then
            (
                (res)=>
                {
                    if(res!=false)
                    {
                        document.querySelector('.customerName').value=res[0].customerName;
                        document.querySelector('.customerMobileNo').value=res[0].phone;
                        document.querySelector('.customerEmail').value=res[0].email;
                        document.querySelector('.customerAddress').value=res[0].address;
                    }
                }
            )
        }
        
        
    },[])


    

    var createUpdateCustomerFunc = ()=>
    {
        var customerName = document.querySelector('.customerName').value
        var customerMobileNo = document.querySelector('.customerMobileNo').value
        var customerEmail = document.querySelector('.customerEmail').value
        var customerAddress =  document.querySelector('.customerAddress').value

        if(customerName.length===0)
        {
            cogoToast.error("Please Provide customer name");
        }
        else if (customerMobileNo.length===0)
        {
            cogoToast.error("Please Provide mobile number");
        }
        else if (customerEmail.length==0 || !/\S+@\S+\.\S+/.test(customerEmail))
        {
            cogoToast.error("Please Provide a valid email address");
        }
        else if (customerAddress.length===0)
        {
            cogoToast.error("Please Provide address");
        }
        else
        {
            if(idFromUrl===undefined)
            {
                createCustomer(customerName,customerMobileNo,customerEmail,customerAddress).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("customer saved");

                            document.querySelector('.customerName').value="";
                            document.querySelector('.customerMobileNo').value="";
                            document.querySelector('.customerEmail').value="";
                            document.querySelector('.customerAddress').value="";
                            
                            navigate('/customerList')
                        }
                    }
                )
            }
            else
            {
                updateCustomer(customerName,customerMobileNo,customerEmail,customerAddress,idFromUrl).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("customer updated");

                            document.querySelector('.customerName').value="";
                            document.querySelector('.customerMobileNo').value="";
                            document.querySelector('.customerEmail').value="";
                            document.querySelector('.customerAddress').value="";

                            navigate('/customerList')
                        }
                    }
                )
            }
            
        }
    }




    return (
        <Fragment>
            <div className='customer-create-update-section'>

                <Zoom>
                <div className='form'>
                <h4>Save Customer</h4>
                    <form>
                        <div className='customer-form-grid'>
                            <div className='col'>
                                <label>Customer Name</label>
                                <input className='customerName' type="text" />
                            </div>
                            <div className='col'>
                                <label>Mobile No</label>
                                <input className='customerMobileNo' type="text" />
                            </div>
                            <div className='col'>
                                <label>Email</label>
                                <input className='customerEmail' type="email" />
                            </div>
                        </div>
                        <div className='customer-textarea'>
                            <label>Address</label>
                            <textarea className='customerAddress'/>
                        </div>
                    </form>
                    <button className='customer-save-btn' onClick={createUpdateCustomerFunc}>Save Customer</button>
                </div>
                </Zoom>
            </div>
        </Fragment>
    );
};

export default CustomerCreateUpdate;
import React,{Fragment,useEffect} from 'react';

import { createSupplier,supplierDetailById,updateSupplier} from '../../APIServices/SupplierAPIServices';
import cogoToast from 'cogo-toast';

import {useDispatch,useSelector} from 'react-redux';

import {useNavigate,useParams} from 'react-router-dom'

const SupplierCreateUpdate = () => 
{

    var navigate = useNavigate();
    var idFromUrl = useParams().id;
    console.log(idFromUrl)

    useEffect(()=>{

        if(idFromUrl!==undefined)
        {
            supplierDetailById(idFromUrl).then
            (
                (res)=>
                {
                    if(res!=false)
                    {
                        document.querySelector('.supplierName').value=res[0].supplierName;
                        document.querySelector('.supplierMobileNo').value=res[0].phone;
                        document.querySelector('.supplierEmail').value=res[0].email;
                        document.querySelector('.supplierAddress').value=res[0].address;
                    }
                }
            )
        }
        
        
    },[])

    var supplierCreateUpdateFunc = ()=>
    {
        var supplierName = document.querySelector('.supplierName').value;
        var phone = document.querySelector('.supplierMobileNo').value;
        var email = document.querySelector('.supplierEmail').value;
        var address = document.querySelector('.supplierAddress').value;

        
        if(supplierName.length===0)
        {
            cogoToast.error("Please Provide supplier name");
        }
        else if (phone.length===0)
        {
            cogoToast.error("Please Provide mobile number");
        }
        else if (email.length==0 || !/\S+@\S+\.\S+/.test(email))
        {
            cogoToast.error("Please Provide a valid email address");
        }
        else if (address.length===0)
        {
            cogoToast.error("Please Provide address");
        }
        else
        {
            if(idFromUrl===undefined)
            {
                createSupplier(supplierName,phone,email,address).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("supplier saved");
    
                            document.querySelector('.supplierName').value="";
                            document.querySelector('.supplierMobileNo').value="";
                            document.querySelector('.supplierEmail').value="";
                            document.querySelector('.supplierAddress').value="";
                            
                            navigate('/supplierList')
                        }
                    }
                )
            }
            else
            {
                updateSupplier(supplierName,phone,email,address,idFromUrl).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("supplier updated");

                            document.querySelector('.supplierName').value="";
                            document.querySelector('.supplierMobileNo').value="";
                            document.querySelector('.supplierEmail').value="";
                            document.querySelector('.supplierAddress').value="";

                            navigate('/supplierList')
                        }
                    }
                )
            }
            
        }

    }



    return (
        <Fragment>
            <div className='supplier-create-update-section'>

                <div className='form'>
                <h4>Save Supplier</h4>
                    <form>
                        <div className='supplier-form-grid'>
                            <div className='col'>
                                <label>Supplier Name</label>
                                <input className='supplierName' type="text" />
                            </div>
                            <div className='col'>
                                <label>Mobile No</label>
                                <input className='supplierMobileNo' type="text" />
                            </div>
                            <div className='col'>
                                <label>Email</label>
                                <input className='supplierEmail' type="email" />
                            </div>
                        </div>
                        <div className='supplier-textarea'>
                            <label>Address</label>
                            <textarea className='supplierAddress'/>
                        </div>
                    </form>
                    <button onClick={supplierCreateUpdateFunc} className='supplier-save-btn'>Save Supplier</button>
                </div>

            </div>
        </Fragment>
    );
};

export default SupplierCreateUpdate;
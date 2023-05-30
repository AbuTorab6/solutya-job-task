import React,{Fragment,useState} from 'react';


import {useNavigate} from 'react-router-dom'

import ReactCodeInput from "react-code-input";
import cogoToast from 'cogo-toast';

import { verifyOTPCode } from '../../APIServices/UserAPIServices';


const VerifyOTP = () => 
{

    var navigate = useNavigate();


    const[v1,v2]=useState({
        OTPCode:""
    })


    var verifyOTPFunc = ()=>
    {
       var userEmail = localStorage.getItem('userEmail')
       var OTPCode = v1.OTPCode;

        if(v1.OTPCode.length===6)
        {
            verifyOTPCode(userEmail,OTPCode).then
            (
                (res)=>
                {
                    if(res===true)
                    {
                        cogoToast.success("OTP verification success");
                        localStorage.setItem('otp',OTPCode)

                        navigate('/newPassword')
                    }
                    else
                    {
                        cogoToast.error("Something is wrong!");
                    }
                }
            )
        }
        else
        {
            cogoToast.error("OTP code must be 6 digit");
        }
    }

    return (
        <Fragment>
            <section className='verify-otp-section'>
                <div className='row'>
                        <div className='form'> 
                            <h5>Verify  OTP</h5>
                            <div className='input'>
                                <p>A 6 Digit verification code has been sent to your email address. </p>
                                <ReactCodeInput onChange={(value)=>v2({OTPCode:value})} type='number' fields={6}   />
                            </div>
                            
                            <div>
                                <button onClick={verifyOTPFunc} className='next-btn'>Next</button>
                            </div>
                        </div>
                    </div>
            </section>
        </Fragment>
    );
};

export default VerifyOTP;
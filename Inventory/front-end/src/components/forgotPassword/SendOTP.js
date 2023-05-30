import React,{Fragment} from 'react';

import {useNavigate} from 'react-router-dom'
import cogoToast from 'cogo-toast';

import { verifyEmail } from '../../APIServices/UserAPIServices';

const SendOTP = () => 
{


    var navigate = useNavigate();


    var verifyEmailFunc = ()=>
    {
      var sendOTPEmail = document.querySelector('.sendOTPEmail').value;
      
      if(sendOTPEmail.length==0 || !/\S+@\S+\.\S+/.test(sendOTPEmail))
      {
        cogoToast.error("Please Provide a valid email address");
      }
      else
      {

        verifyEmail(sendOTPEmail).then
        (
            (res)=>
            {
                if(res===true)
                {
                   
                    localStorage.setItem('userEmail',sendOTPEmail)

                    navigate('/verifyOTP')
                }
                else
                {
                    cogoToast.error("Something is wrong!");
                }
            }
        )

      }


    }



    return (
        <Fragment>
            <section className='send-otp-section'>
                <div className='row'>
                        <div className='form'>
                            <form>
                                <h5>Send OTP</h5>
                                <div>
                                    <input className='sendOTPEmail' type="text" placeholder="Enter your email here"/>
                                </div>
                            </form>

                            <div>
                                <button onClick={verifyEmailFunc}  className='next-btn'>Next</button>
                            </div>
                        </div>
                    </div>
            </section>
        </Fragment>
    );
};

export default SendOTP;
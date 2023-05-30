import React,{Fragment} from 'react';


import cogoToast from 'cogo-toast';
import {useNavigate} from 'react-router-dom'

import { resetPassword } from '../../APIServices/UserAPIServices';

const NewPassword = () => 
{

    
    var navigate = useNavigate();

    var resetPassFunc = ()=>
    {
        var newPass = document.querySelector('.newPass').value;
        var newPassConfirm = document.querySelector('.newPassConfirm').value;

        var userEmail = localStorage.getItem('userEmail')
        var userOtp = localStorage.getItem('otp');

        if(newPass.length===0)
        {
            cogoToast.error("provide a valid password");
        }
        else if(newPassConfirm.length===0)
        {
            cogoToast.error("Confirm password field can not be empty")
        }
        else if(newPass!==newPassConfirm)
        {
            cogoToast.error("new password and confirm password are not same")
        }
        else
        {

            resetPassword(userEmail,userOtp,newPass).then
            (
                (res)=>
                {
                    if(res===true)
                    {
                        cogoToast.success("password resent success")

                        navigate('/login')
                    }
                }
            )

        }


    }

    return (
        <Fragment>
            <section className='new-password-section'>
            <div className='row'>
                    <div className='form'>
                        <form>
                            <h5>Set New Password</h5>
                            <div>
                                <input className='' type="text" placeholder="Your email"/>
                            </div>
                            <div>
                                <input className='newPass' type="password" placeholder="enter new Password"/>
                            </div>
                            <div>
                                <input className='newPassConfirm' type="password" placeholder="confirm Password"/>
                            </div>
                        </form>

                        <div>
                            <button onClick={resetPassFunc}  className='next-btn'>Next</button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default NewPassword;
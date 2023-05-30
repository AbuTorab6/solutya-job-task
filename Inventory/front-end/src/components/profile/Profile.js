import cogoToast from 'cogo-toast';
import React,{Fragment,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import { userProfileDetail,updateUserProfile } from '../../APIServices/UserAPIServices';

const Profile = () => 
{

    var navigate = useNavigate();

    useEffect(()=>{

        userProfileDetail().then
        (
            (res)=>
            {
                if(res!==false)
                {
                    document.querySelector('.profileEmail').value=res[0].email;
                    document.querySelector('.profileFirstName').value=res[0].firstName;
                    document.querySelector('.profileLastName').value=res[0].lastName;
                    document.querySelector('.profileMobile').value=res[0].mobile;
                    document.querySelector('.profilePassword').value=res[0].password;
                }
            }
        )
    })


    var uploadImage = ()=>
    {
        var image = document.querySelector('.profileImage').files[0]; //receiving the image file from input field

        //converting the image to base 64 formate
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        }).then
        (
            (imageToBase64)=> // image will convert into base64 format. and the converted image will store in the parameter "imageToBase64".
            {
                document.querySelector('.preview-profile-pic-img').setAttribute("src",imageToBase64 );
            }
        )
    }




    var updateProfileFunc = ()=>
    {
        var profileFirstName= document.querySelector('.profileFirstName').value;
        var profileLastName= document.querySelector('.profileLastName').value;
        var profileMobile= document.querySelector('.profileMobile').value;
        var profilePassword= document.querySelector('.profilePassword').value;
        var role = JSON.parse(localStorage.getItem('userDetail')).role;
        var accessibility = JSON.parse(localStorage.getItem('userDetail')).accessibility;
        var profilePhoto = document.querySelector('.preview-profile-pic-img').getAttribute("src");

        var profileEmail= document.querySelector('.profileEmail').value;

        if(profileFirstName.length===0)
        { 
            cogoToast.error("Please Provide first name");
        }
        else if(profileLastName.length==0)
        {
            cogoToast.error("Please Provide last name");
        }
        else if (profileMobile.length==0 )
        {
            cogoToast.error("Please Provide mobile number");
        }
        else if (profilePassword.length==0)
        {
            cogoToast.error("Please Provide password");
        }
        else
        {
            updateUserProfile(profileFirstName,profileLastName,profileMobile,profilePassword,profilePhoto).then
            (
                (res)=>
                {
                    if(res===true)
                    {
                        cogoToast.success("your profile have updated");

                        var updateLocalStorage = {
                            firstName:profileFirstName,
                            lastName: profileLastName,
                            email : profileEmail,
                            mobile:profileMobile,
                            photo:profilePhoto,
                            role:role,
                            accessibility:accessibility
                        }

                        localStorage.setItem('userDetail',JSON.stringify(updateLocalStorage));
                        navigate('/')
                    }
                }
            )
        }
    }











    return (
        <Fragment>
            <div className='profile-section'>
                
                <div className='preview-profile-pic'>
                    <img className='preview-profile-pic-img' src={JSON.parse(localStorage.getItem('userDetail')).photo} />
                </div>
                <h2 className='text-center mb-3 text-capitalize'>{JSON.parse(localStorage.getItem('userDetail')).firstName+" "+JSON.parse(localStorage.getItem('userDetail')).lastName}</h2>

                <div className='form'>
                    <form>
                        <div className='profile-form-grid'>
                            <div className='col'>
                                <label>Profile Picture</label>
                                <input onChange={uploadImage} className='profileImage' type="file" />
                            </div>
                            <div className='col'>
                                <label>Email</label>
                                <input className='profileEmail' type="email" readOnly={true} />
                            </div>
                            <div className='col'>
                                <label>First Name</label>
                                <input className='profileFirstName' type="text" />
                            </div>
                            <div className='col'>
                                <label>Last Name</label>
                                <input className='profileLastName' type="text" />
                            </div>
                            <div className='col'>
                                <label>Mobile</label>
                                <input className='profileMobile' type="text" />
                            </div>
                            <div className='col'>
                                <label>Password</label>
                                <input className='profilePassword' type="password" />
                            </div>
                        </div>
                    </form>
                    <button onClick={updateProfileFunc} className='profile-update-btn'>Update</button>
                </div>
            </div>
        </Fragment>
    );
};

export default Profile;
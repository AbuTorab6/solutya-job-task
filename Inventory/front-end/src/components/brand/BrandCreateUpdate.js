import React,{Fragment,useEffect} from 'react';

import { createBrand,brandDetailById,updateBrand } from '../../APIServices/BrandAPIServices';
import cogoToast from 'cogo-toast';
import {useNavigate,useParams} from 'react-router-dom'

const BrandCreateUpdate = () => 
{

    var navigate = useNavigate();
    var idFromUrl = useParams().id;

    useEffect(()=>{

        if(idFromUrl!==undefined)
        {
            brandDetailById(idFromUrl).then
            (
                (res)=>
                {
                    if(res!=false)
                    {
                        document.querySelector('.brandName').value=res[0].name;
                    }
                }
            )
        }
        
    },[])

    var createUpdateBrandFunc = ()=>
    {
        var name = document.querySelector('.brandName').value;

        if(name.length===0)
        {
            cogoToast.error("Please Provide brand name");
        }
        else
        {
            if(idFromUrl===undefined)
            {
                createBrand(name).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("brand saved");
    
                            document.querySelector('.brandName').value="";
                            
                            navigate('/brandList')
                        }
                    }
                )
            }
            else
            {
                updateBrand(name,idFromUrl).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("brand updated");

                            document.querySelector('.brandName').value="";

                            navigate('/brandList')
                        }
                    }
                )
            }
            
        }

    }



    return (
        <Fragment>
            <div className='brand-create-update-section'>

                <div className='form'>
                <h4>Save Brand</h4>
                    <form>
                        <div className='brand-form-grid'>
                            <div className='col'>
                                <label>Brand Name</label>
                                <input className='brandName' type="text" />
                            </div>
                        </div>
                    </form>
                    <button onClick={createUpdateBrandFunc} className='brand-save-btn' >Save Brand</button>
                </div>

            </div>
        </Fragment>
    );
};

export default BrandCreateUpdate;
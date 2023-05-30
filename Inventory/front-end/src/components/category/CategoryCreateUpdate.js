import React,{Fragment,useEffect} from 'react';

import { createCategory,categoryDetailById,updateCategory } from '../../APIServices/CategoryAPIServices';
import cogoToast from 'cogo-toast';
import {useNavigate,useParams} from 'react-router-dom'

const CategoryCreateUpdate = () => 
{

    var navigate = useNavigate();
    var idFromUrl = useParams().id;


    useEffect(()=>{

        if(idFromUrl!==undefined)
        {
            categoryDetailById(idFromUrl).then
            (
                (res)=>
                {
                    if(res!=false)
                    {
                        document.querySelector('.categoryName').value=res[0].name;
                    }
                }
            )
        }
        
    },[])




    var createUpdateCategoryFunc = ()=>
    {
        var name = document.querySelector('.categoryName').value;

        if(name.length===0)
        {
            cogoToast.error("Please Provide category name");
        }
        else
        {
            if(idFromUrl===undefined)
            {
                createCategory(name).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("category saved");
    
                            document.querySelector('.categoryName').value="";
                            
                            navigate('/categoryList')
                        }
                    }
                )
            }
            else
            {
                updateCategory(name,idFromUrl).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("category updated");

                            document.querySelector('.categoryName').value="";

                            navigate('/categoryList')
                        }
                    }
                )
            }
            
        }

    }


    return (
        <Fragment>
            <div className='category-create-update-section'>

                <div className='form'>
                <h4>Save Category</h4>
                    <form>
                        <div className='category-form-grid'>
                            <div className='col'>
                                <label>Category Name</label>
                                <input className='categoryName' type="text" />
                            </div>
                        </div>
                    </form>
                    <button onClick={createUpdateCategoryFunc} className='category-save-btn' >Save Brand</button>
                </div>

            </div>
        </Fragment>
    );
};

export default CategoryCreateUpdate;
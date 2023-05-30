import React,{Fragment,useEffect} from 'react';

import { createExpenseType,expenseTypeDetailById,updateExpenseType } from '../../APIServices/ExpenseTypeAPIServices';
import cogoToast from 'cogo-toast';
import {useNavigate,useParams} from 'react-router-dom'

const ExpenseTypeCreateUpdate = () => 
{
    var navigate = useNavigate();

    var idFromUrl = useParams().id;



    useEffect(()=>{

        if(idFromUrl!==undefined)
        {
            expenseTypeDetailById(idFromUrl).then
            (
                (res)=>
                {
                    if(res!=false)
                    {
                        document.querySelector('.expenseTypeName').value=res[0].name;
                    }
                }
            )
        }
        
        
    },[])




    var createUpdateExpenseTypeFunc = ()=>
    {
        var name = document.querySelector('.expenseTypeName').value
        
        if(name.length===0)
        {
            cogoToast.error("Please Provide expense type name");
        }
        else
        {
            if(idFromUrl===undefined)
            {
                createExpenseType(name).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("expense type saved");
    
                            document.querySelector('.expenseTypeName').value="";
                            
                            navigate('/expenseTypeList')
                        }
                    }
                )
            }
            else
            {
                updateExpenseType(name,idFromUrl).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("expense type updated");

                            document.querySelector('.expenseTypeName').value="";

                            navigate('/expenseTypeList')
                        }
                    }
                )
            }
            
        }
    }


    return (
        <Fragment>
            <div className='expenseType-create-update-section'>

            <div className='form'>
            <h4>Save Expense Type</h4>
                <form>
                    <div className='expenseType-form-grid'>
                        <div className='col'>
                            <label>Expense Type Name</label>
                            <input className='expenseTypeName' type="text" />
                        </div>
                    </div>
                </form>
                <button onClick={createUpdateExpenseTypeFunc} className='expenseType-save-btn' >Save Expense Type</button>
            </div>

            </div>
        </Fragment>
    );
};

export default ExpenseTypeCreateUpdate;
import React,{Fragment,useEffect} from 'react';

import { expenseTypeDropdown,createExpense,expenseDetailById ,updateExpense} from '../../APIServices/ExpenseAPIServices';
import { setAllExpenseTypeFunc } from '../../redux/stateSlice/expenseState';


import cogoToast from 'cogo-toast';

import {useDispatch,useSelector} from 'react-redux';
import {useNavigate,useParams} from 'react-router-dom'




const ExpenseCreateUpdate = () => 
{

    var navigate = useNavigate();
    var dispatch = useDispatch();

    var idFromUrl = useParams().id;

    useEffect(()=>{

        if(idFromUrl===undefined)
        {
            expenseTypeDropdown().then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        dispatch(setAllExpenseTypeFunc(res));
                    }
                }
            )
        }
        else
        {
            expenseDetailById(idFromUrl).then
            (
                (res)=>
                {
                    if(res!=false)
                    {
                        document.querySelector('.expenseType').value=res[0].expenseTypeId;
                        document.querySelector('.expenseAmount').value=res[0].amount;
                        document.querySelector('.expenseNote').value=res[0].note;
                    }
                }
            )
        }
    },[])


    

    var expenseCreateUpdateFunc = () =>
    {
        var expenseType = document.querySelector('.expenseType').value;
        var expenseAmount =parseInt(document.querySelector('.expenseAmount').value) ;
        var expenseNote = document.querySelector('.expenseNote').value;
        
        if(expenseType.length===0)
        {
            cogoToast.error("Please select expense type");
        }
        else if (expenseAmount.length===0)
        {
            cogoToast.error("Please Provide expense amount");
        }
        else if(expenseNote.length===0)
        {
            cogoToast.error("Please Provide expense note");
        }
        else
        {
            if(idFromUrl===undefined)
            {
                createExpense(expenseType,expenseAmount,expenseNote).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("expense saved");
    
                            document.querySelector('.expenseType').value="";
                            document.querySelector('.expenseAmount').value="";
                            document.querySelector('.expenseNote').value="";
                            
                            navigate('/expenseList')
                        }
                    }
                )
            }
            else
            {
                updateExpense(expenseType,expenseAmount,expenseNote,idFromUrl).then
                (
                    (res)=>
                    {
                        if(res===true)
                        {
                            cogoToast.success("expense updated");

                            document.querySelector('.expenseType').value="";
                            document.querySelector('.expenseAmount').value="";
                            document.querySelector('.expenseNote').value="";

                            navigate('/expenseList')
                        }
                    }
                )
            }
            
        }
    }

 


    let allExpenseType = useSelector((state)=>state.expenseState.allExpenseType);

    return (
        <Fragment>
            <div className='expense-create-update-section'>

                <div className='form'>
                    <h4>Save Expense</h4>
                        <form>
                            <div className='expense-form-grid'>
                                <div className='col'>
                                    <label>Expense Type</label>
                                    <select className='expenseType'>
                                        <option value="">Select Type</option>
                                        {
                                            allExpenseType.map(
                                                (p1,p2)=>
                                                {
                                                    return(
                                                        <option value={p1._id}>{p1.name}</option>
                                                    )
                                                }
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='col'>
                                    <label>Expense Amount</label>
                                    <input className='expenseAmount' type="number" />
                                </div>
                                <div className='col'>
                                    <label>Expense Note</label>
                                    <input className='expenseNote' type="text" />
                                </div>
                            </div>
                        </form>
                        <button onClick={expenseCreateUpdateFunc}  className='expense-save-btn' >Save Expense</button>
                </div>

            </div>
        </Fragment>
    );
};

export default ExpenseCreateUpdate;
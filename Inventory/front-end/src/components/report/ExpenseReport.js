import React,{Fragment} from 'react';
import cogoToast from 'cogo-toast';

import exportFromJSON from 'export-from-json'
import moment from 'moment'


import { expenseReport } from '../../APIServices/ReportAPIServices';
import { setReportTotal,setReportData } from '../../redux/stateSlice/expenseState';

import {useDispatch,useSelector} from 'react-redux';

const ExpenseReport = () => 
{

    var dispatch = useDispatch();


    var expenseReportFunc = ()=>
    {
        var fromDate = document.querySelector('.fromDate').value;
        var toDate = document.querySelector('.toDate').value;

        if(fromDate.length===0)
        {
            cogoToast.error("Please provide from date");
        }
        else if (toDate.length===0)
        {
            cogoToast.error("Please provide to date");
        }
        else
        {
            expenseReport(fromDate+"T00:00:00.000+00:00" ,toDate+"T00:00:00.000+00:00").then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        if(res[0].data.length===0)
                        {
                            dispatch(setReportTotal(0));
                            dispatch(setReportData([]));
                        }
                        else
                        {
                            dispatch(setReportTotal(res[0].total[0].totalAmount));
                            dispatch(setReportData(res[0].data));
                        }
                        
                    }
                }
            )
        }
    }



    var downloadReport = (reportData)=>
    {
        var fileName = 'expenseReport';
       var exportType = exportFromJSON.types.csv

        console.log(reportData)
        if(reportData.length!==0)
        {
            var data = reportData.map(
                (p1,p2)=>
                {
                   return(
                    {
                        "amount":p1.amount,
                        "note":p1.note,
                        "category":p1.typeDetail[0].name,
                        "date":moment(p1.createdDate).format("MMM Do YY")
                    }
                   )
                }
            )
        }
        

        exportFromJSON({data,fileName,exportType})

    }





    let reportData = useSelector((state)=>state.expenseState.reportData);
    let reportTotal = useSelector((state)=>state.expenseState.reportTotal);

    return (
        <Fragment>
            <div className='expense-report-section'>

                <div className='form'>
                    <h4>Expense Report By Date</h4>
                        <form>
                            <div className='report-form-grid'>
                                
                                <div className='col'>
                                    <label>From Date</label>
                                    <input className='fromDate' type="date" />
                                </div>
                                <div className='col'>
                                    <label>To Date</label>
                                    <input className='toDate' type="date" />
                                </div>
                            </div>
                        </form>
                        <button onClick={expenseReportFunc}  className='report-save-btn' >Create</button>
                </div>

                {
                    reportData.length===0 ?
                    (
                        <div></div>
                    )
                    :
                    (
                        <div className='report-bottom'>
                            <h6>Total Expense : {reportTotal}</h6>
                            <button onClick={downloadReport.bind(this,reportData)} className='report-download-btn'>Download CSV</button>
                        </div>
                    )
                }
                

            </div>
        </Fragment>
    );
};

export default ExpenseReport;
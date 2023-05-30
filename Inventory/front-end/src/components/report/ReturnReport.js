import React,{Fragment} from 'react';
import cogoToast from 'cogo-toast';


import exportFromJSON from 'export-from-json'
import moment from 'moment'

import { returnDetailReport } from '../../APIServices/ReportAPIServices';
import { setReturnReportTotal,setReturnReportData } from '../../redux/stateSlice/returnState';


import {useDispatch,useSelector} from 'react-redux';

const ReturnReport = () => 
{

    var dispatch = useDispatch();


    var returnReportFunc = ()=>
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
            returnDetailReport(fromDate+"T00:00:00.000+00:00" ,toDate+"T00:00:00.000+00:00").then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        if(res[0].data.length===0)
                        {
                            dispatch(setReturnReportTotal(0));
                            dispatch(setReturnReportData([]));
                        }
                        else
                        {
                            dispatch(setReturnReportTotal(res[0].total[0].totalAmount));
                            dispatch(setReturnReportData(res[0].data));
                        }
                        
                    }
                }
            )
        }
    }






    var downloadReport = (reportData)=>
    {
        var fileName = 'returnReport';
       var exportType = exportFromJSON.types.csv

        if(reportData.length!==0)
        {
            var data = reportData.map(
                (p1,p2)=>
                {
                   return(
                    {
                        "unit return":p1.quantity,
                        "unit cost":p1.unitCost,
                        "total cost":p1.total,
                        "product name":p1.productDetail[0].name,
                        "product category":p1.categoryDetail[0].name,
                        "product brand":p1.brandDetail[0].name,
                        "date":moment(p1.createdDate).format("MMM Do YY")
                    }
                   )
                }
            )
        }
        

        exportFromJSON({data,fileName,exportType})

    }





    
    let returnReportData = useSelector((state)=>state.returnState.returnReportData);
    let returnReportTotal = useSelector((state)=>state.returnState.returnReportTotal);





    return (
        <Fragment>
            <div className='return-report-section'>

                <div className='form'>
                    <h4>Return Report By Date</h4>
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
                    <button onClick={returnReportFunc} className='report-save-btn' >Create</button>
                </div>

                {
                    returnReportData.length===0 ?
                    (
                        <div></div>
                    )
                    :
                    (
                        <div className='report-bottom'>
                            <h6>Total Return : {returnReportTotal}</h6>
                            <button onClick={downloadReport.bind(this,returnReportData)} className='report-download-btn'>Download CSV</button>
                        </div>
                    )
                }


            </div>
        </Fragment>
    );
};

export default ReturnReport;
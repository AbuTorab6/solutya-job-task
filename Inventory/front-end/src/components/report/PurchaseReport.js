import React,{Fragment} from 'react';
import cogoToast from 'cogo-toast';

import exportFromJSON from 'export-from-json'
import moment from 'moment'

import { purchaseDetailReport } from '../../APIServices/ReportAPIServices';
import { setPurchaseReportTotal,setPurchaseReportData } from '../../redux/stateSlice/purchaseState';

import {useDispatch,useSelector} from 'react-redux';

const PurchaseReport = () => 
{

    var dispatch = useDispatch();


    var purchaseReportFunc = ()=>
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
            purchaseDetailReport(fromDate+"T00:00:00.000+00:00" ,toDate+"T00:00:00.000+00:00").then
            (
                (res)=>
                {
                    if(res!==false)
                    {
                        if(res[0].data.length===0)
                        {
                            dispatch(setPurchaseReportTotal(0));
                            dispatch(setPurchaseReportData([]));
                        }
                        else
                        {
                            dispatch(setPurchaseReportTotal(res[0].total[0].totalAmount));
                            dispatch(setPurchaseReportData(res[0].data));
                        }
                        
                    }
                }
            )
        }
    }

    var downloadReport = (reportData)=>
    {
        var fileName = 'purchaseReport';
       var exportType = exportFromJSON.types.csv

        if(reportData.length!==0)
        {
            var data = reportData.map(
                (p1,p2)=>
                {
                   return(
                    {
                        "unit purchased":p1.quantity,
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





    let purchaseReportData = useSelector((state)=>state.purchaseState.purchaseReportData);
    let purchaseReportTotal = useSelector((state)=>state.purchaseState.purchaseReportTotal);



    return (
        <Fragment>
            <div className='purchase-report-section'>

                <div className='form'>
                    <h4>Purchase Report By Date</h4>
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
                    <button onClick={purchaseReportFunc}  className='report-save-btn' >Create</button>
                </div>

                {
                    purchaseReportData.length===0 ?
                    (
                        <div></div>
                    )
                    :
                    (
                        <div className='report-bottom'>
                            <h6>Total Purchase : {purchaseReportTotal}</h6>
                            <button onClick={downloadReport.bind(this,purchaseReportData)} className='report-download-btn'>Download CSV</button>
                        </div>
                    )
                }


            </div>
        </Fragment>
    );
};

export default PurchaseReport;
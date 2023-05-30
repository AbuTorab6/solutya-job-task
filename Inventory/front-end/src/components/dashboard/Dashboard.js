import React,{Fragment,useEffect} from 'react';


import cogoToast from 'cogo-toast';
import {useDispatch,useSelector} from 'react-redux';

import { expenseSummary,purchaseSummary,returnSummary,sellSummary } from '../../APIServices/DashboardAPIServices';
import { setExpenseTotalFunc,setPurchaseTotalFunc,setReturnTotalFunc,setSellTotalFunc,setExpenseChartFunc,setPurchaseChartFunc,setReturnChartFunc,setSellChartFunc } from '../../redux/stateSlice/dashboardState';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Zoom from 'react-reveal/Zoom';

const Dashboard = () => 
{

    var dispatch = useDispatch();

    useEffect(()=>{

        expenseSummary().then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setExpenseTotalFunc(res[0].total[0].totalAmount));
                    dispatch(setExpenseChartFunc(res[0].last30Days));

                }
            }
        )

        purchaseSummary().then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setPurchaseTotalFunc(res[0].total[0].totalAmount));
                    dispatch(setPurchaseChartFunc(res[0].last30Days));
                }
            }
        )

        returnSummary().then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setReturnTotalFunc(res[0].total[0].totalAmount));
                    dispatch(setReturnChartFunc(res[0].last30Days));
                }
            }
        )

        sellSummary().then
        (
            (res)=>
            {
                if(res!==false)
                {
                    dispatch(setSellTotalFunc(res[0].total[0].totalAmount));
                    dispatch(setSellChartFunc(res[0].last30Days));
                }
            }
        )

        
        
        
    },[])

    let expenseTotal = useSelector((state)=>state.dashboardState.expenseTotal);
    let purchaseTotal = useSelector((state)=>state.dashboardState.purchaseTotal);
    let returnTotal = useSelector((state)=>state.dashboardState.returnTotal);
    let sellTotal = useSelector((state)=>state.dashboardState.sellTotal);

    let expenseChart = useSelector((state)=>state.dashboardState.expenseChart);
    let purchaseChart = useSelector((state)=>state.dashboardState.purchaseChart);
    let returnChart = useSelector((state)=>state.dashboardState.returnChart);
    let sellChart = useSelector((state)=>state.dashboardState.sellChart);


    return (
        <Fragment>
            <Zoom >
            <section className='dashboard-section'>
                <div className='totalAmount-grid'>
                    <div className='col'>
                        <p>Total Expense</p>
                        <p><b>{expenseTotal}</b></p>
                    </div>
                    <div className='col'>
                        <p>Total Purchase</p>
                        <p><b>{purchaseTotal}</b></p>
                    </div>
                    <div className='col'>
                        <p>Total Return</p>
                        <p><b>{returnTotal}</b></p>
                    </div>
                    <div className='col'>
                        <p>Total Sell</p>
                        <p><b>{sellTotal}</b></p>
                    </div>
                </div>
                <div className='chart-grid'>
                    <div className='col'>
                        <p className='chart-title'>expense last 30 days</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart width={500} height={400} data={expenseChart} margin={{top:10,right:30,left:0,bottom: 0,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='col'>
                        <p className='chart-title'>purchase last 30 days</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart width={500} height={400} data={purchaseChart} margin={{top:10,right:30,left:0,bottom: 0,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fill="#00A884" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='col'>
                        <p className='chart-title'>return last 30 days</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart width={500} height={400} data={returnChart} margin={{top:10,right:30,left:0,bottom: 0,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fill="#F7F700" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='col'>
                        <p className='chart-title'>sell last 30 days</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart width={500} height={400} data={sellChart} margin={{top:10,right:30,left:0,bottom: 0,}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="totalAmount" stroke="#8884d8" fill="#F06146" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
            </Zoom>
        </Fragment>
    );
};

export default Dashboard;
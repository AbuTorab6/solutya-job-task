import React,{Fragment} from 'react';


import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ExpenseReport from '../../components/report/ExpenseReport';

const ExpenseReportPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ExpenseReport/>
            </SideNavigation>
        </Fragment>
    );
};

export default ExpenseReportPage;
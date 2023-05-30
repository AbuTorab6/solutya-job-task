import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ExpenseTypeList from '../../components/expenseType/ExpenseTypeList';

const ExpenseTypeListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ExpenseTypeList/>
            </SideNavigation>
        </Fragment>
    );
};

export default ExpenseTypeListPage;
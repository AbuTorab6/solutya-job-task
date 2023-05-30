import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ExpenseList from '../../components/expense/ExpenseList';

const ExpenseListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ExpenseList/>
            </SideNavigation>
        </Fragment>
    );
};

export default ExpenseListPage;
import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ExpenseCreateUpdate from '../../components/expense/ExpenseCreateUpdate';

const ExpenseCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ExpenseCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default ExpenseCreateUpdatePage;
import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ExpenseTypeCreateUpdate from '../../components/expenseType/ExpenseTypeCreateUpdate';

const ExpenseTypeCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ExpenseTypeCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default ExpenseTypeCreateUpdatePage;
import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import CustomerList from '../../components/customer/CustomerList';

const CustomerListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <CustomerList/>
            </SideNavigation>
        </Fragment>
    );
};

export default CustomerListPage;
import React,{Fragment} from 'react';
import SideNavigation from '../../components/MasterLayout/SideNavigation';
import CustomerCreateUpdate from '../../components/customer/CustomerCreateUpdate';

const CustomerCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <CustomerCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default CustomerCreateUpdatePage;
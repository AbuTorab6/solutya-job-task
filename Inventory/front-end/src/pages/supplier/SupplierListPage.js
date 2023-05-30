import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import SupplierList from '../../components/supplier/SupplierList';

const SupplierListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <SupplierList/>
            </SideNavigation>
        </Fragment>
    );
};

export default SupplierListPage;
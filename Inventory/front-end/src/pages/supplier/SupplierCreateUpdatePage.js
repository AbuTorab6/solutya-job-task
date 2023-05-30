import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import SupplierCreateUpdate from '../../components/supplier/SupplierCreateUpdate';

const SupplierCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <SupplierCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default SupplierCreateUpdatePage;
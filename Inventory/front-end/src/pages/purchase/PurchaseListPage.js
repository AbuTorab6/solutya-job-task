import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import PurchaseList from '../../components/purchase/PurchaseList';

const PurchaseListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <PurchaseList/>
            </SideNavigation>
        </Fragment>
    );
};

export default PurchaseListPage;
import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import PurchaseCreateUpdate from '../../components/purchase/PurchaseCreateUpdate';

const PurchaseCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <PurchaseCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default PurchaseCreateUpdatePage;
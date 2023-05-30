import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import PurchaseReport from '../../components/report/PurchaseReport';

const PurchaseReportPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <PurchaseReport/>
            </SideNavigation>
        </Fragment>
    );
};

export default PurchaseReportPage;
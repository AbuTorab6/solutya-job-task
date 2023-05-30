import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ReturnReport from '../../components/report/ReturnReport';

const ReturnReportPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ReturnReport/>
            </SideNavigation>
        </Fragment>
    );
};

export default ReturnReportPage;
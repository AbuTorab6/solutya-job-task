import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import SellReport from '../../components/report/SellReport';

const SellReportPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <SellReport/>
            </SideNavigation>
        </Fragment>
    );
};

export default SellReportPage;
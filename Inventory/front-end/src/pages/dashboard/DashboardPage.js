import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import Dashboard from '../../components/dashboard/Dashboard';

const DashboardPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <Dashboard/>
            </SideNavigation>
        </Fragment>
    );
};

export default DashboardPage;
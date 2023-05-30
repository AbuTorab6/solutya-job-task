import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ReturnList from '../../components/return/ReturnList';

const ReturnListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ReturnList/>
            </SideNavigation>
        </Fragment>
    );
};

export default ReturnListPage;
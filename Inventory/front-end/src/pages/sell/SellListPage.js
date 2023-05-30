import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import SellList from '../../components/sell/SellList';

const SellListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <SellList/>
            </SideNavigation>
        </Fragment>
    );
};

export default SellListPage;
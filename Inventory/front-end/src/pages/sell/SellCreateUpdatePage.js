import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import SellCreateUpdate from '../../components/sell/SellCreateUpdate';

const SellCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <SellCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default SellCreateUpdatePage;
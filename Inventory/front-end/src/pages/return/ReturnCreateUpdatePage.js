import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ReturnCreateUpdate from '../../components/return/ReturnCreateUpdate';

const ReturnCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ReturnCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default ReturnCreateUpdatePage;
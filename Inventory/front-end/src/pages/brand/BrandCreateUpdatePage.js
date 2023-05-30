import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import BrandCreateUpdate from '../../components/brand/BrandCreateUpdate';

const BrandCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <BrandCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default BrandCreateUpdatePage;
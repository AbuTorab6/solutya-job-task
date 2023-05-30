import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import BrandList from '../../components/brand/BrandList';

const BrandListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <BrandList/>
            </SideNavigation>
        </Fragment>
    );
};

export default BrandListPage;
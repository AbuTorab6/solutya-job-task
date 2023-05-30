import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ProductCreateUpdate from '../../components/product/ProductCreateUpdate';

const ProductCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ProductCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default ProductCreateUpdatePage;
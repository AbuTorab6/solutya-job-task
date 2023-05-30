import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import ProductList from '../../components/product/ProductList';

const ProductListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <ProductList/>
            </SideNavigation>
        </Fragment>
    );
};

export default ProductListPage;
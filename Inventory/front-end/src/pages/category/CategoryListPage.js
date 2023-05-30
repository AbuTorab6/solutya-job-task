import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import CategoryList from '../../components/category/CategoryList';

const CategoryListPage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <CategoryList/>
            </SideNavigation>
        </Fragment>
    );
};

export default CategoryListPage;
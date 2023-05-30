import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import CategoryCreateUpdate from '../../components/category/CategoryCreateUpdate';

const CategoryCreateUpdatePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <CategoryCreateUpdate/>
            </SideNavigation>
        </Fragment>
    );
};

export default CategoryCreateUpdatePage;
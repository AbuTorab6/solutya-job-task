import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import Registration from '../../components/registration/Registration';

const RegistrationPage = () => {
    return (
        <Fragment>
            

            <SideNavigation>
                <Registration/>
            </SideNavigation>
        </Fragment>
    );
};

export default RegistrationPage;




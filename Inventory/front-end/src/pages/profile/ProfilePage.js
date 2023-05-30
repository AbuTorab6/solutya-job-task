import React,{Fragment} from 'react';

import SideNavigation from '../../components/MasterLayout/SideNavigation';
import Profile from '../../components/profile/Profile';

const ProfilePage = () => {
    return (
        <Fragment>
            <SideNavigation>
                <Profile/>
            </SideNavigation>
        </Fragment>
    );
};

export default ProfilePage;
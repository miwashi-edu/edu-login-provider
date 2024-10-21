import React, { useContext } from 'react';
import { LoginContext } from '../Providers';
import LoginOrganism from '../Organisms/LoginOrganism.jsx';
import ProfileOrganism from '../Organisms/ProfileOrganism.jsx';

const Content = ({ profileApiUrl, profilePath, loginProps }) => {
    const { isLoggedIn } = useContext(LoginContext);
    return (
        <div>
            {isLoggedIn ? <ProfileOrganism apiUrl={profileApiUrl} path={profilePath} /> : <LoginOrganism {...loginProps} />}
        </div>
    );
};

export default Content;

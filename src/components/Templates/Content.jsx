import React, { useContext } from 'react';
import { LoginContext } from '../Providers';
import LoginOrganism from '../Organisms/LoginOrganism.jsx';
import ProfileOrganism from '../Organisms/ProfileOrganism.jsx';

const Content = () => {
    const { isLoggedIn } = useContext(LoginContext);
    return (
        <div>
            {isLoggedIn ? <ProfileOrganism /> : <LoginOrganism />}
        </div>
    );
};

export default Content;
import React from 'react';
import LoginPage from './LoginPage.jsx';
import { LoginProvider } from "../Providers";

export default {
    title: 'Pages/LoginPage',
    component: LoginPage,
    decorators: [
        (Story) => <LoginProvider>
            <Story/>
        </LoginProvider>
    ],
    argTypes: {
        headerProps: { control: 'object' },
        contentProps: {
            control: 'object',
            defaultValue: { profileApiUrl: 'http://localhost:3000', profilePath: '/api/users/' }
        },
        footerProps: { control: 'object' }
    }
};

export const Default = {
    args: {
        headerProps: {},  // Default props for Header
        contentProps: {   // Default props for Content, include any necessary defaults here
            profileApiUrl: 'http://localhost:3000',
            profilePath: '/api/users/'
        },
        footerProps: {}  // Default props for Footer
    }
};

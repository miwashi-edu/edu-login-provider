import React from 'react';
import { LoginProvider } from "../Providers";
import Content from './Content.jsx';

export default {
    title: 'Templates/Content',
    component: Content,
    decorators: [
        (Story) => <LoginProvider>
            <Story/>
        </LoginProvider>
    ],
    argTypes: {
        profileApiUrl: { control: 'text' },
        profilePath: { control: 'text' },
        loginProps: { control: 'object' }
    }
};

export const Default = {
    args: {
        profileApiUrl: 'http://localhost:3000',
        profilePath: '/api/users/',
        loginProps: {}  // You can define default props for LoginOrganism here if needed
    }
};

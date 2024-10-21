import React from 'react';
import MainTemplate from '../Templates/MainTemplate.jsx';
import Header from '../Templates/Header.jsx';
import Footer from '../Templates/Footer.jsx';
import Content from '../Templates/Content.jsx';

const LoginPage = () => (
    <MainTemplate
        header={<Header />}
        content={<Content />}
        footer={<Footer />}
    />
);

export default LoginPage;

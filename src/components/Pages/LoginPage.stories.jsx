import LoginPage from './LoginPage.jsx';
import {LoginProvider} from "../Providers";

export default {
    title: 'Pages/LoginPage',
    component: LoginPage,
    decorators: [
        (Story) => <LoginProvider>
            <Story/>
        </LoginProvider>
    ]
}

export const Default = {

}
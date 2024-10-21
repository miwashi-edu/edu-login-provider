import {LoginProvider} from "../Providers";
import Content from './Content.jsx';

export default {
    title: 'Templates/Content',
    component: Content,
    decorators: [
        (Story) => <LoginProvider>
            <Story/>
        </LoginProvider>
    ]
}

export const Default =  {

}
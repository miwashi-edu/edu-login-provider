import ProfileOrganism from './ProfileOrganism.jsx';
import {LoginProvider} from '../Providers';

export default {
    title: 'Organisms/ProfileOrganism',
    component: ProfileOrganism,
    decorators: [
        (Story)=> <LoginProvider>
                    <Story/>
                </LoginProvider>
    ]
}

export const Default = {

}
// Import components
import Choose from '../components/Choose/Choose';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
import Deactivate from '../components/Deactivate/Deactivate';
import Change from '../components/Change/Change';
import Forgot from '../components/Forgot/Forgot';
import ForgotChange from '../components/ForgotChange/ForgotChange';
import Submit from '../components/Submit/Submit';

/**
 * Define the routes
 * Each route will have:
 * Path: Which api path?
 * Component: Import the component to display it
 * Title: The tab title 
 * Auth: Determine if user is allow to see the component or not
 * One more variable to prevent pages to random go different pages only pages with the auth: true
 */
const routes = [
    {
        path: '//',
        component: Choose,
        title: 'Welcome',
        auth: false,
    },
    {
        path: '/register',
        component: Register,
        title: 'Register',
        auth: false,
    },
    {
        path: '/login',
        component: Login,
        title: 'Login',
        auth: false,
    },
    {
        path: '/forgot',
        component: Forgot,
        title: 'Forgot',
        auth: false,
    },
    {
        path: '/change',
        component: ForgotChange,
        title: 'Change',
        auth: true,
        forgot: true
    },
    {
        path: '/settings/profile',
        component: Profile,
        title: 'Profile',
        auth: true,
        profile: true
    },
    {
        path: '/settings/change',
        component: Change,
        title: 'Change',
        auth: true,
        change: true
    },
    {
        path: '/settings/deactivate',
        component: Deactivate,
        title: 'Deactivate',
        auth: true,
        deactivate: true
    },
    {
        path: '/home',
        component: Home,
        title: 'PawUMass',
        auth: true,
        home: true
    },
    {
        path: '/user/submit',
        component: Submit,
        title: 'Submit',
        auth: true,
        submit: true
    },
    {
        path: '/donate',
        component: '',
        title: 'Donate',
        auth: true,
        donate: true
    }
];

export default routes;
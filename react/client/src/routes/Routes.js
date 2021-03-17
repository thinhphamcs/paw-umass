// Import components
import Choose from '../components/Choose/Choose';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
import Deactivate from '../components/Deactivate/Deactivate';

/**
 * Define the routes
 * Each route will have:
 * Path: Which api path?
 * Component: Import the component to display it
 * Title: The tab title 
 * Auth: Determine if user is allow to see the component or not
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
        path: '/settings/profile',
        component: Profile,
        title: 'Profile',
        auth: true,
    },
    {
        path: '/settings/forgot',
        component: '',
        title: 'Forgot',
        auth: true,
    },
    {
        path: '/settings/deactivate',
        component: Deactivate,
        title: 'Deactivate',
        auth: true,
    },
    {
        path: '/home',
        component: Home,
        title: 'PawUMass',
        auth: true,
    },
    {
        path: '/submit',
        component: '',
        title: 'Submit',
        auth: true,
    },
    {
        path: '/donate',
        component: '',
        title: 'Donate',
        auth: true,
    }
];

export default routes;
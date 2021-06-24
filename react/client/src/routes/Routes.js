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
// import Donate from '../components/Donate/Donate';
import About from '../components/About/About';
import ToS from '../components/ToS/ToS';
import Privacy from '../components/Privacy/Privacy';
import Cookies from '../components/Cookies/Cookies';
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
        guest: true,
    },
    {
        path: '/register',
        component: Register,
        title: 'Register',
        guest: true,
    },
    {
        path: '/login',
        component: Login,
        title: 'Login',
        guest: true,
    },
    {
        path: '/forgot',
        component: Forgot,
        title: 'Forgot',
        guest: true,
    },
    {
        path: '/change',
        component: ForgotChange,
        title: 'Change',
        authenticated: true,
    },
    {
        path: '/about',
        component: About,
        title: 'About',
        guest: true,
    },
    {
        path: '/tos',
        component: ToS,
        title: 'Terms Of Service',
        guest: true,
    },
    {
        path: '/privacy',
        component: Privacy,
        title: 'Privacy Policy',
        guest: true,
    },
    {
        path: '/cookies',
        component: Cookies,
        title: 'Cookie Policy',
        guest: true,
    },
    {
        path: '/settings/profile',
        component: Profile,
        title: 'Profile',
        authenticated: true,
    },
    {
        path: '/settings/change',
        component: Change,
        title: 'Change',
        authenticated: true,
    },
    {
        path: '/settings/deactivate',
        component: Deactivate,
        title: 'Deactivate',
        authenticated: true,
    },
    // {
    //     path: '/home',
    //     component: Home,
    //     title: 'PawUMass',
    //     authenticated: true,
    // },
    {
        path: '/user/submit',
        component: Submit,
        title: 'Submit',
        authenticated: true,
    },
    {
        path: '/user/donate',
        component: Donate,
        title: 'Donate',
        authenticated: true,
    }
];

export default routes;
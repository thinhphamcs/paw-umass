// Import
import Choose from '../components/Choose/Choose';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';

// Define the routes
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
        path: '/home',
        component: Home,
        title: 'PawUMass',
        auth: true,
    },
    {
        path: '/forgot',
        component: '',
        title: 'Forgot',
        auth: true,
    },
    {
        path: '/profile',
        component: Profile,
        title: 'Profile',
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
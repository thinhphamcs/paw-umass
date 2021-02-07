// Import
import Choose from '../components/Choose/Choose';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Home from '../components/Home/Home';

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
    },
    {
        path: '/submit',
        component: '',
        title: 'Submit',
    },
    {
        path: '/donate',
        component: '',
        title: 'Donate',
    }
];

export default routes;
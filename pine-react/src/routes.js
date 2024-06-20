import HomePage from './pages/Home.jsx';
import RosterPage from './pages/Roster.jsx';
import SignUpPage from './pages/SignUp.jsx';

export default [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/roster/',
        component: RosterPage,
    },
    {
        path: '/signup/',
        component: SignUpPage,
    },
];

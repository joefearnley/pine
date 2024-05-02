import HomePage from './pages/Home.jsx';
import RosterPage from './pages/Roster.jsx';

export default [
    {
        path: '/',
        component: HomePage,
        tabs: [
            {
                path: '/home/',
                id: 'tab-home',
                component: HomePage,
            },
            {
                path: '/roster/',
                id: 'tab-roster',
                component: RosterPage,
            },
        ],
    }
];

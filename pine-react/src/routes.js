import HomePage from './pages/Home.jsx';
import RosterPage from './pages/Roster.jsx';
import EditPlayerPage from './pages/EditPlayerPage.jsx';

export default [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/roster',
        component: RosterPage,
    },
    {
        path: '/edit-player/:playerId',
        component: EditPlayerPage,
    },
];

import HomePage from './pages/Home.jsx';
import RosterPage from './pages/Roster.jsx';
import EditPlayerPage from './pages/EditPlayerPage.jsx';
import AddPlayerPage from './pages/AddPlayerPage.jsx';

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
        path: '/add-player',
        component: AddPlayerPage,
    },
    {
        path: '/edit-player/:playerId',
        component: EditPlayerPage,
    },
];

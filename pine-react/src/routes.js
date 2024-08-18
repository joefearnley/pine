import HomePage from './pages/Home.jsx';
import RosterPage from './pages/Roster.jsx';
import EditPlayerPage from './pages/EditPlayerPage.jsx';
import AddPlayerPage from './pages/AddPlayerPage.jsx';
import TeamPage from './pages/TeamPage.jsx';

export default [
    {
        path: '/',
        component: HomePage,
    },{
        path: '/roster',
        component: RosterPage,
    },{
        path: '/team',
        component: TeamPage,
    },{
        path: '/add-player',
        component: AddPlayerPage,
    },{
        path: '/edit-player/:playerId',
        component: EditPlayerPage,
    },
];

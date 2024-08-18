import { useState, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import {
    Page,
    Navbar,
    NavTitle,
    Block,
    BlockTitle,
    List,
    ListGroup,
    Preloader,
} from 'framework7-react';
import { playerDB } from '../db.js';
import PageToolbar from '../components/PageLinks.jsx';
import PlayerListItem from '../components/PlayerListItem.jsx';

const HomePage = () => {
    const [playersPlaying, setPlayersPlaying] = useState([]);
    const [playersOnBench, setPlayersOnBench] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        playerDB.loadPlayers();
        setPlayersPlaying(playerDB.playersPlaying());
        setPlayersOnBench(playerDB.playersOnBench());

        setLoading(false);
    }, []);

    const movePlayerToField = evt => {
        playerDB.updatePlayerPlaying(evt.item.dataset.playerId, true);
    }

    const movePlayerToBench = evt => {
        playerDB.updatePlayerPlaying(evt.item.dataset.playerId, false);
    }

    return (
        <Page name="home">
            <Navbar>
                <NavTitle sliding>Pine Home</NavTitle>
            </Navbar>

            {playersPlaying.length === 0 && playersOnBench === 0 && (
                <div>Add a Player</div>
            )}


            <PageToolbar page="Home" />
        </Page>
    )
};

export default HomePage;

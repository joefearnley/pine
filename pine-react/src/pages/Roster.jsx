import { useState, useEffect } from 'react';
import {
    f7,
    Page,
    Navbar,
    List,
    ListGroup,
    BlockTitle,
    Block,
    Preloader,
    useStore,
} from 'framework7-react';
import store from '../store.js';
import PageToolbar from '../components/PageLinks.jsx';
import PlayerListItem from '../components/PlayerListItem.jsx';

const RosterPage = () => {
    const [players, setPlayers] = useState([]);

    const allPlayers = useStore('players');

    useEffect(() => {
        store.dispatch('loadPlayers');

        setPlayers(allPlayers);
    }, [allPlayers]);

    return (
        <Page name="roster">
            <Navbar title="Roster" />
            <BlockTitle>Players</BlockTitle>
            {players.length && (
                <List dividersIos simpleList strong outline>
                    <ListGroup>
                        {players.map((player) => (
                            <PlayerListItem
                                key={player.id}
                                title={player.name} 
                                playerId={player.id}>
                            </PlayerListItem>
                        ))}
                    </ListGroup>
                </List>
            )}

            {store.loading && (
                <Block className="text-align-center">
                    <Preloader />
                </Block>
            )}

            <PageToolbar page="Roster" />
        </Page>
    )
};

export default RosterPage;
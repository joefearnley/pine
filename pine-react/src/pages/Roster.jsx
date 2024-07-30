import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    List,
    ListGroup,
    Link,
    BlockTitle,
    Block,
    Preloader,
    useStore,
    SwipeoutActions,
    SwipeoutButton,
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

    const editPlayer = evt => {
        console.log('clicked...');
        console.log(evt);
    };

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
                                name={player.name} 
                                playerId={player.id} >
                                    <SwipeoutActions right>
                                        <SwipeoutButton>Edit</SwipeoutButton>
                                        <SwipeoutButton delete>Delete</SwipeoutButton>
                                    </SwipeoutActions>
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
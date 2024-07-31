import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    List,
    ListGroup,
    ListItem,
    BlockTitle,
    Block,
    Preloader,
    useStore,
    SwipeoutActions,
    SwipeoutButton,
} from 'framework7-react';
import store from '../store.js';
import PageToolbar from '../components/PageLinks.jsx';

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
                            <ListItem
                                key={player.id}
                                title={player.name}
                                after={`# ${player.number}`}
                                subtitle="Not Playing">
                                    <SwipeoutActions right>
                                        <SwipeoutButton>Edit</SwipeoutButton>
                                        <SwipeoutButton delete>Delete</SwipeoutButton>
                                    </SwipeoutActions>
                            </ListItem>
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
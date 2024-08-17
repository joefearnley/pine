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
import playerDB from '../db.js';
import PageToolbar from '../components/PageLinks.jsx';

const RosterPage = (props) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        playerDB.loadPlayers();

        setPlayers(playerDB.getPlayers());

        setLoading(false);
    }, []);

    const editPlayer = playerId => {
        props.f7router.navigate(`/edit-player/${playerId}`);
    };

    return (
        <Page name="roster">
            <Navbar title="Roster" />
            <BlockTitle>Players</BlockTitle>
            {players.length && (
                <List dividersIos mediaList strong outline>
                    <ListGroup>
                        {players.map((player) => (
                            <ListItem
                                swipeout
                                key={player.id}
                                title={player.name}
                                after={`# ${player.number}`}
                                text={player.isPlaying? `Field` : `Bench`}>
                                    <SwipeoutActions right>
                                        <SwipeoutButton onClick={() => editPlayer(player.id)}>Edit</SwipeoutButton>
                                        <SwipeoutButton delete>Delete</SwipeoutButton>
                                    </SwipeoutActions>
                            </ListItem>
                        ))}
                    </ListGroup>
                </List>
            )}

            {loading && (
                <Block className="text-align-center">
                    <Preloader />
                </Block>
            )}

            <PageToolbar page="Roster" />
        </Page>
    )
};

export default RosterPage;
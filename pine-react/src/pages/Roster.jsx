import { useState, useEffect } from 'react';
import {
    f7,
    Page,
    Navbar,
    Toolbar,
    Link,
    List,
    ListGroup,
    BlockTitle,
    Block,
    Preloader,
    useStore,
} from 'framework7-react';
import store from '../store.js';
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

            <Toolbar bottom tabbar>
                <Link 
                    href="/"
                    active
                    iconIos="f7:house_fill"
                    iconMd="material:home"> 
                    Home
                </Link>
                <Link 
                    href="/roster/"
                    iconIos="f7:list_dash"
                    iconMd="material:list">
                    Roster
                </Link>
            </Toolbar>
        </Page>
    )
};

export default RosterPage;
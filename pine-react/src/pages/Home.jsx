import { useState, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import {
    Page,
    Navbar,
    Toolbar,
    Link,
    Block,
    BlockTitle,
    List,
    ListGroup,
    ListItem,
    Preloader,
    useStore
} from 'framework7-react';
import store from '../store.js';

const HomePage = () => {
    const [playersPlaying, setPlayersPlaying] = useState([]);
    const [playersOnBench, setPlayersOnBench] = useState([]);

    const initialPlayersPlaying = useStore('playersPlaying');
    const initialPlayersOnBench = useStore('playersOnBench');

    useEffect(() => {
        store.dispatch('loadPlayers');

        setPlayersPlaying(initialPlayersPlaying);
        setPlayersOnBench(initialPlayersOnBench);
    }, [initialPlayersPlaying, initialPlayersOnBench]);

    function movePlayerToField(evt) {
        store.dispatch('updatePlayerPlaying', evt.item, true);
    }

    function movePlayerToBench(evt) {
        console.log(evt);
        // console.log(evt.dataset.playerId);

        store.dispatch('updatePlayerPlaying', evt.item, false);
    }

    return (
        <Page name="home">
            <Navbar title="Home" />
            <BlockTitle>Playing</BlockTitle>
            {store.loading && (
                <Block className="text-align-center">
                    <Preloader />
                </Block>
            )}
            
            {playersPlaying.length && (
                <List dividersIos simpleList strong outline>
                    <ListGroup>
                        <ReactSortable
                            list={playersPlaying}
                            setList={setPlayersPlaying}
                            group="sharedGroup"
                            onAdd={movePlayerToField}
                        >
                            {playersPlaying.map((player) => (
                                <ListItem 
                                    key={player.id}
                                    title={player.name}
                                    data-player-id={player.id}>
                                </ListItem>
                            ))}
                        </ReactSortable>
                    </ListGroup>
                </List>
            )}
    
            <BlockTitle>Bench</BlockTitle>
            {store.loading && (
                <Block className="text-align-center">
                    <Preloader />
                </Block>
            )}

            {playersOnBench.length && (
                <List dividersIos simpleList strong outline>
                    <ListGroup>
                        <ReactSortable
                            list={playersOnBench}
                            setList={setPlayersOnBench}
                            group="sharedGroup"
                            onAdd={movePlayerToBench}
                        >
                            {playersOnBench.map((player) => (
                                <ListItem key={player.id}>
                                    {player.name}
                                </ListItem>
                            ))}
                        </ReactSortable>
                    </ListGroup>
                </List>
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
                <Link 
                    href="/team/"
                    iconIos="f7:list_dash"
                    iconMd="material:list">
                    Team
                </Link>
            </Toolbar>
        </Page>
    )
};

export default HomePage;

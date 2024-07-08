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

    let allPlayers = useStore('players');

    useEffect(() => {
        store.dispatch('getPlayers');

        setPlayersPlaying(allPlayers.filter(player => player.isPlaying));
        setPlayersOnBench(allPlayers.filter(player => !player.isPlaying));
    }, []);

    function movePlayerToField(id) {
        console.log('moving player to field');
        // updatePlayerPlaying(id, true);
    }

    function movePlayerToBench(id) {
        console.log('moving player to bench');
        // updatePlayerPlaying(id, false);
    }

    function updatePlayerPlaying(playerId, playing) {
        // console.log(data);
        // console.log(error);
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
                                <ListItem key={player.id}>
                                    {player.name}
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

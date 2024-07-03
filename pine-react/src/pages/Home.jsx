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
    const [playersNotPlaying, setPlayersNotPlaying] = useState([]);
    const [loading, setLoading] = useState(false);

    let allPlayers = useStore('players');

    useEffect(() => {
        setLoading(true);
        store.dispatch('getPlayers');

        setPlayersPlaying(allPlayers.filter(player => player.isPlaying));
        setPlayersNotPlaying(allPlayers.filter(player => !player.isPlaying));

        setLoading(false);
    }, [allPlayers]);

    function movePlayerToField(id) {
        updatePlayerPlaying(id, true);
    };

    function movePlayerToBench(id) {
        updatePlayerPlaying(id, false);
    };

    function updatePlayerPlaying(playerId, playing) {
        // console.log(data);
        // console.log(error);
    }

    return (
        <Page name="home">
            <Navbar title="Home" />
            <BlockTitle>Playing</BlockTitle>
            {loading && (
                <Block className="text-align-center">
                    <Preloader />
                </Block>
            )}
            
            {playersNotPlaying.length && (
                <List dividersIos simpleList strong outline>
                    <ListGroup>
                        <ReactSortable
                            list={playersPlaying}
                            setList={setPlayersPlaying}
                            group="sharedGroup"
                            onAdd={movePlayerToField}
                        >
                            {playersPlaying.map((player) => (
                                <li key={player.id}>
                                    {player.name}
                                </li>
                            ))}
                        </ReactSortable>
                    </ListGroup>
                </List>
            )}
    
            <BlockTitle>Bench</BlockTitle>
            {loading && (
                <Block className="text-align-center">
                    <Preloader />
                </Block>
            )}

            {playersNotPlaying.length && (
                <List dividersIos simpleList strong outline>
                    <ListGroup>
                        <ReactSortable
                            list={playersNotPlaying}
                            setList={setPlayersNotPlaying}
                            group="sharedGroup"
                            onAdd={movePlayerToBench}
                        >
                            {playersNotPlaying.map((player) => (
                                <li key={player.id}>
                                    {player.name}
                                </li>
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
            </Toolbar>
        </Page>
    )
};

export default HomePage;

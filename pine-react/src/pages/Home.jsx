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
    Preloader,
    Icon,
    useStore,
} from 'framework7-react';
import store from '../store.js';
import PlayerListItem from '../components/PlayerListItem.jsx';

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

    const movePlayerToField = evt => {
        store.dispatch('updatePlayerPlaying', { 
            playerId: evt.item.dataset.playerId,
            isPlaying: true
        });
    }

    const movePlayerToBench = evt => {
        store.dispatch('updatePlayerPlaying', { 
            playerId: evt.item.dataset.playerId,
            isPlaying: false
        });
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
                            onRemove={movePlayerToBench}
                        >
                            {playersPlaying.map((player) => (
                                <PlayerListItem 
                                    key={player.id}
                                    title={player.name}
                                    playerId={player.id}>
                                </PlayerListItem>
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
                            onRemove={movePlayerToField}
                        >
                            {playersOnBench.map((player) => (
                                <PlayerListItem 
                                    key={player.id}
                                    title={player.name}
                                    playerId={player.id}>
                                </PlayerListItem>
                            ))}
                        </ReactSortable>
                    </ListGroup>
                </List>
             )}

            <Toolbar bottom tabbar>
                <Link 
                    href="/"
                    active
                    >
                        <Icon
                            ios="f7:house_fill"
                            md="material:home"
                            size="20px" />
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
                    iconIos="f7:info_circle_fill"
                    iconMd="material:info">
                    Team
                </Link>
            </Toolbar>
        </Page>
    )
};

export default HomePage;

import { useState, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import {
    Page,
    Navbar,
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
            <Navbar title="Pine" />
            <BlockTitle>Playing</BlockTitle>
            {loading && (
                <Block className="text-align-center">
                    <Preloader />
                </Block>
            )}
            
            {playersPlaying.length && (
                <List dividersIos strong strongIos>
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
                                    player={player}>
                                </PlayerListItem>
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

            {playersOnBench.length && (
                <List dividersIos strong strongIos>
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
                                    player={player}>
                                </PlayerListItem>
                            ))}
                        </ReactSortable>
                    </ListGroup>
                </List>
             )}

            <PageToolbar page="Home" />
        </Page>
    )
};

export default HomePage;

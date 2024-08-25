import { useState, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import {
    Page,
    Navbar,
    NavTitle,
    Block,
    BlockTitle,
    List,
    ListGroup,
    ListButton,
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
        setPlayersPlaying(playerDB.playersPlaying());
    }

    const movePlayerToBench = evt => {
        playerDB.updatePlayerPlaying(evt.item.dataset.playerId, false);
        setPlayersOnBench(playerDB.playersOnBench());
    }

    return (
        <Page name="home">
            <Navbar>
                <NavTitle sliding>Pine</NavTitle>
            </Navbar>

            {playersPlaying.length === 0 && playersOnBench.length === 0 && (
                <>
                    <BlockTitle>Block Title</BlockTitle>
                    <Block strong outline inset>
                    <p>It appears you don't have any players on your roster yet. Click the button below to add one.</p>
                    </Block>
                    <List inset strong>
                        <ListButton title="Add a Player" href="/add-player" />  
                    </List>
                </>
            )}

            <>
                <BlockTitle>Playing</BlockTitle>
                {loading && (
                    <Block className="text-align-center">
                        <Preloader />
                    </Block>
                )}
                <List mediaList dividersIos strong strongIos>
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
                                    player={player}
                                    showPosition={true}>
                                </PlayerListItem>
                            ))}
                        </ReactSortable>
                    </ListGroup>
                </List>
            </>

            <>
                <BlockTitle>Bench</BlockTitle>
                {loading && (
                    <Block className="text-align-center">
                        <Preloader />
                    </Block>
                )}
                <List mediaList dividersIos strong strongIos>
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
                                    player={player}
                                    showPosition={false}>
                                </PlayerListItem>
                            ))}
                        </ReactSortable>
                    </ListGroup>
                </List>
            </>

            <PageToolbar page="Home" />
        </Page>
    )
};

export default HomePage;

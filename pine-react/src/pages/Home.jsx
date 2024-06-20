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
    Preloader
} from 'framework7-react';

const HomePage = () => {
    const [playersPlaying, setPlayersPlaying] = useState([]);
    const [playersNotPlaying, setPlayersNotPlaying] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setPlayers();
    }, []);

    async function movePlayerToField(evt) {
        updatePlayerPlaying(evt.item.dataset.id, true);
    };

    async function movePlayerToBench(evt) {
        updatePlayerPlaying(evt.item.dataset.id, false);
    };

    async function updatePlayerPlaying(playerId, playing) {
        const { data, error } = await supabase
            .from('players')
            .update({ is_playing: playing })
            .eq('id', playerId);

        console.log(data);
        console.log(error);
    }

    async function setPlayers() {
        
        // console.log('sertting players');

        // const response = await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        // });
        
        // const data = await response.json();

        // console.log(data);

        // let playing = data.filter(item => item.is_playing);
        // let onTheBench = data.filter(item => !item.is_playing);

        // setPlayersPlaying(playing);
        // setPlayersNotPlaying(onTheBench);
        // setLoading(false);
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
                <Link href="/signup/">
                    Sign Up
                </Link>
            </Toolbar>
        </Page>
    )
};

export default HomePage;

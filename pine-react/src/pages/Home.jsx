import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'
// import Sortable, { MultiDrag, Swap } from 'sortablejs';
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


// Sortable.mount(new MultiDrag(), new Swap());

const HomePage = () => {
    const [playersPlaying, setPlayersPlaying] = useState([]);
    const [playersNotPlaying, setPlayersNotPlaying] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const playersOnFieldEl = document.querySelector('#players-players ul');
        // Sortable.create(playersOnFieldEl, {
        //     group: 'shared',
        //     multiDrag: true,
        //     selectedClass: 'selected',
        //     animation: 150,
        //     onAdd: function (evt) {
        //         const playerId = parseInt(evt.item.dataset.id);
        //         console.log(`moving player go field: ${playerId}`);
        //         // Roster.movePlayerToField(playerId);
        //     },
        // });
    
        // const playersOnBenchtEl = document.querySelector('#players-not-playing ul');
        // Sortable.create(playersOnBenchtEl, {
        //   group: 'shared',
        //   multiDrag: true,
        //   selectedClass: 'selected',
        //   animation: 150,
        //   onAdd: function (evt) {
        //       const playerId = parseInt(evt.item.dataset.id);
        //       console.log(`moving player go bench: ${playerId}`);
        //       // Roster.movePlayerToBench(playerId);
        //   },
        // });

        setLoading(true);
        setPlayers();
      }, []);

      async function setPlayers() {
        const { data } = await supabase.from('players').select();
        let playing = data.filter(item => item.is_playing);
        let onTheBench = data.filter(item => !item.is_playing);

        setPlayersPlaying(playing);
        setPlayersNotPlaying(onTheBench);
        setLoading(false);
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
                            group="shared-group"
                        >
                            {playersPlaying.map((item) => (
                                <ListItem key={item.id} title={item.name} />
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
                            group="shared-group"
                        >
                            {playersNotPlaying.map((item) => (
                                <ListItem key={item.id} title={item.name} />
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

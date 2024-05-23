import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Toolbar,
    Link,
    BlockTitle,
    List,
    ListGroup,
    ListItem
} from 'framework7-react';

import Sortable, { MultiDrag, Swap } from 'sortablejs';

Sortable.mount(new MultiDrag(), new Swap());

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

        setPlayers();
      }, []);

      async function setPlayers() {
        const { players } = await supabase.from("players").select();
        console.log(players);

        setPlayersPlaying(players);
        setLoading(false);
    }

    return (
        <Page name="home">
            <Navbar title="Home" />
            <BlockTitle>Playing</BlockTitle>
            {playersNotPlaying.length && (
                <List id="players-playing" dividersIos simpleList strong outline>
                    <ListGroup>
                        {playersPlaying.map((item) => (
                            <ListItem key={item.id} title={item.name} />
                        ))}
                    </ListGroup>
                </List>
            )}

            <BlockTitle>Bench</BlockTitle>
            {playersNotPlaying.length && (
                <List id="players-not-playing" dividersIos simpleList strong outline>
                    <ListGroup>
                        {playersNotPlaying.map((item) => (
                            <ListItem key={item.id} title={item.name} />
                        ))}
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

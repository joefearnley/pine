import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Toolbar,
    Icon,
    Link,
    BlockTitle,
    List,
    ListGroup,
    ListItem
} from 'framework7-react';
import Sortable, { MultiDrag, Swap } from 'sortablejs';

Sortable.mount(new MultiDrag(), new Swap());

const HomePage = () => {
    const [players, setPlayers] = useState([
        { id: 1, name: "shrek" },
        { id: 2, name: "fiona" },
        { id: 3, name: "black" },
        { id: 4, name: "white" },
    ]);

    useEffect(() => {
        const playersOnFieldEl = document.querySelector('#players-on-field ul');
        Sortable.create(playersOnFieldEl, {
            group: 'shared',
            multiDrag: true,
            selectedClass: 'selected',
            animation: 150,
            onAdd: function (evt) {
                const playerId = parseInt(evt.item.dataset.id);
                console.log(`moving player go field: ${playerId}`);
                // Roster.movePlayerToField(playerId);
            },
        });
    
        const playersOnBenchtEl = document.querySelector('#players-on-bench ul');
        Sortable.create(playersOnBenchtEl, {
          group: 'shared',
          multiDrag: true,
          selectedClass: 'selected',
          animation: 150,
          onAdd: function (evt) {
              const playerId = parseInt(evt.item.dataset.id);
              console.log(`moving player go bench: ${playerId}`);
              // Roster.movePlayerToBench(playerId);
          },
        });
      }, []);

    return (
        <Page name="home">
            <Navbar title="Home" />
            <BlockTitle>Playing</BlockTitle>
            <List id="players-on-field" dividersIos simpleList strong outline>
                <ListGroup>
                    {players.map((item) => (
                        <ListItem key={item.id} title={item.name} />
                    ))}
                </ListGroup>
            </List>
            <BlockTitle>Bench</BlockTitle>
            <List id="players-on-bench" dividersIos simpleList strong outline>
                <ListGroup>
                    {players.map((item) => (
                        <ListItem key={item.id} title={item.name} />
                    ))}
                </ListGroup>
            </List>
            <Toolbar bottom tabbar>
                <Link href="/home/" active> 
                    Home
                </Link>
                <Link href="/roster/">
                    Roster
                </Link>
            </Toolbar>
        </Page>
    )
};

export default HomePage;


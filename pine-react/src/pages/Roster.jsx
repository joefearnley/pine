import { useState, useEffect } from 'react';
import {
    f7,
    Page,
    Navbar,
    Toolbar,
    Link,
    List,
    ListGroup,
    ListItem,
    BlockTitle,
    Block,
    useStore,
    Preloader,
} from 'framework7-react';

const RosterPage = () => {
    let players = useStore('players');

    useEffect(() => {
        f7.store.dispatch('getPlayers');
    }, []);

    return (
        <Page name="roster">
            <Navbar title="Roster" />
            <BlockTitle>Players</BlockTitle>
            {players && (
                <List dividersIos simpleList strong outline>
                    <ListGroup>
                        {players.map((item) => (
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

export default RosterPage;
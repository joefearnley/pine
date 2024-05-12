import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Toolbar,
    Link,
    List,
    ListGroup,
    ListItem,
    BlockTitle,
    useStore,
} from 'framework7-react';

const RosterPage = () => {
    // let players = [];


    let players = useStore('players');

    //  // load initial player data
    // useEffect(() => {
    //     store.dispatch('getPlayers');
    // }, []);

    return (
        <Page name="roster">
            <Navbar title="Roster" />
            <BlockTitle>Playing</BlockTitle>
            <List dividersIos simpleList strong outline>
                <ListGroup>
                    {players.map((item) => (
                        <ListItem key={item.id} title={item.name} />
                    ))}
                </ListGroup>
            </List>
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
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
} from 'framework7-react';

const RosterPage = () => {
    const players = useStore('players');
    const loading = useStore('loading');

    useEffect(() => {
        f7.store.dispatch('getPlayers');
        console.log(players);
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

            <Block className="text-align-center">
            {loading && <Preloader />}
            </Block>
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
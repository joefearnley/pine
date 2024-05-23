import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'

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
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPlayers();
    }, []);

    async function getPlayers() {
        const { data } = await supabase.from("players").select();
        setPlayers(data);
        setLoading(false);
    }

    return (
        <Page name="roster">
            <Navbar title="Roster" />
            <BlockTitle>Players</BlockTitle>
            {players.length && (
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
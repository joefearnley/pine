import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

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

const supabase = createClient('https://dsmpjsdsczwgkafubpga.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbXBqc2RzY3p3Z2thZnVicGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMzY5NjIsImV4cCI6MjAzMTkxMjk2Mn0.j_Eo_4mV2M0sFm9hFiH2MvmYnEh8nO37DK6T2HdN1tw');

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
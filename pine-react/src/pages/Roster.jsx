import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Toolbar,
    Icon,
    Link,
} from 'framework7-react';

const RosterPage = () => {
    const [players, setPlayers] = useState([
        { id: 1, name: "shrek" },
        { id: 2, name: "fiona" },
        { id: 3, name: "black" },
        { id: 4, name: "white" },
    ]);

    useEffect(() => {
        const playersOnFieldEl = document.querySelector('#players-on-field ul');
    }, []);

    return (
        <Page name="roster">
            <Navbar title="Roster" />
            <Toolbar bottom tabbar>
                <Link href="/" active>
                    <Icon icon="icon-house"></Icon>
                    Home
                </Link>
                <Link href="/roster/">
                    <Icon icon="icon-list_bullet"></Icon>
                    Roster
                </Link>
            </Toolbar>
        </Page>
    )
};

export default RosterPage;
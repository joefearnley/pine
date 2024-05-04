import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Toolbar,
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
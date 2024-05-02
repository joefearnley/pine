import {
    Page,
    Navbar,
    Toolbar,
    Icon,
    Link,
} from 'framework7-react';

const RosterPage = () => {
    return (
        <Page name="roster">
            <Navbar title="Roster" />
            <Toolbar bottom tabbar>
                <Link tabLink href="/home" tabLinkActive>
                    <Icon icon="icon-house"></Icon>
                    Home
                </Link>
                <Link tabLink  href="/roster">
                    <Icon icon="icon-list_bullet"></Icon>
                    Roster
                </Link>
            </Toolbar>
            
        </Page>
    )
};

export default RosterPage;
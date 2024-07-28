import {
    Toolbar,
    Link,
} from 'framework7-react';

const PageToolbar = (props) => {
    return (
        <Toolbar bottom tabbar>
            <Link 
                href="/"
                tabLinkActive={props.page === 'Home' ? true : false}
                iconIos="f7:house_fill"
                iconMd="material:home">
                Home
            </Link>
            <Link 
                href="/roster/"
                tabLinkActive={props.page === 'Roster' ? true : false}
                iconIos="f7:list_dash"
                iconMd="material:list">
                Roster
            </Link>
            <Link 
                href="/team/"
                tabLinkActive={props.page === 'Team' ? true : false}
                iconIos="f7:info_circle_fill"
                iconMd="material:info">
                Team
            </Link>
        </Toolbar>
    )
}

export default PageToolbar;
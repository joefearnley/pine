import { useState, useEffect } from 'react'
import {
    App, 
    View,
    Toolbar,
    Link,
    Icon
} from 'framework7-react';
import routes from './routes.js';

export default () => {

    return (
        <App theme="auto" name="Pine" routes={routes}>
            <View main url="/">
                <Toolbar bottom tabbar>
                    <Link tabLink="/home/" tabLinkActive>
                        <Icon icon="icon-house"></Icon>
                        Home
                    </Link>
                    <Link tabLink="/roster/">
                        <Icon icon="icon-list_bullet"></Icon>
                        Roster
                    </Link>
                </Toolbar>
            </View>
        </App>
    )
}

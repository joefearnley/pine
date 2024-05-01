import { useState, useEffect } from 'react'
import { App, 
    NavRight, 
    Panel, 
    View, 
    Page, 
    Navbar, 
    BlockTitle, 
    Button, 
    List,
    ListGroup,
    ListItem,
    Icon,
    Toolbar,
    Link,
} from 'framework7-react';
import routes from './routes.js';

export default () => {

  return (
    <App theme="auto" name="Pine" routes={routes}>
      <View main>
        <Page>
          <Navbar title="Awesome App"></Navbar>
          <Toolbar bottom tabbar>
            <Link tabLink="/" tabLinkActive>
              <Icon icon="icon-house"></Icon>
              Home
            </Link>
            <Link tabLink="/roster/">
            <Icon icon="icon-list_bullet"></Icon>
              Roster
            </Link>
          </Toolbar>
        </Page>
      </View>
    </App>
  )
}

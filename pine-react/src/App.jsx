import { useState } from 'react'
import { App, 
  NavRight, 
  Panel, 
  View, 
  Page, 
  Navbar, 
  BlockTitle, 
  Button, 
  List,
  ListItem,
  Icon
} from 'framework7-react';
import { ReactSortable } from "react-sortablejs";

export default () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
    { id: 3, name: "black" },
    { id: 4, name: "white" },
  ]);

  return (
    /* Main Framework7 App component where we pass Framework7 params */
    <App theme="auto" name="My App">

      {/*  Main view */}
      <View main>
        <Page>
          <Navbar title="Awesome App"></Navbar>
          <BlockTitle>Playing</BlockTitle>
          <List dividersIos simpleList strong outline>
            <ReactSortable list={players} setList={setPlayers}>
              {players.map((item) => (
                <ListItem key={item.id} title={item.name} />
              ))}
            </ReactSortable>
          </List>
        </Page>
      </View>
    </App>
  )
}

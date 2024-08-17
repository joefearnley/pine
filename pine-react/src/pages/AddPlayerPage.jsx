import { useState, useRef } from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    Link,
    List,
    Block,
    ListInput,
    Button,
    f7,
} from 'framework7-react';
import PageToolbar from '../components/PageLinks.jsx';
import playerDB from '../db.js';

const AddPlayerPage = (props) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const toast = useRef(null);

    playerDB.loadPlayers();

    const addPlayer = () => {
        playerDB.addPlayer(name, parseInt(number));

        if (!toast.current) {
            toast.current = f7.toast.create({
              text: `Player ${name} - #${number} Created.`,
              position: 'top',
              closeTimeout: 2000,
            });
          }

          toast.current.open();

          setTimeout(() => {
            props.f7router.navigate(`/roster`);
          }, 3000);
    };

    return (
        <Page name="signup">
            <Navbar>
                <NavLeft>
                    <Link
                        href="/roster"
                        iconIos="f7:arrow_left"
                        iconMd="material:arrow_back" />
                </NavLeft>
                <NavTitle sliding>Edit Player</NavTitle>
            </Navbar>
            <List strongIos dividersIos insetIos>
            <ListInput
                    label="Name"
                    type="text"
                    placeholder="enter player full name"
                    required
                    validate
                    clearButton
                    value={name}
                    onChange={e => setName(e.target.value)}
                >
                </ListInput>
                <ListInput
                    label="Number"
                    type="text"
                    placeholder="enter player number"
                    required
                    validate
                    clearButton
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                >
                </ListInput>
            </List>

            <Block>
                <Button large fill onClick={addPlayer}>
                    Add Player
                </Button>
            </Block>

            <PageToolbar page="Roster" />
        </Page>
    )
};

export default AddPlayerPage;

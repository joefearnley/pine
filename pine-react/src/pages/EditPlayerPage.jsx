import { useState, useEffect, useRef } from 'react';
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
import { playerDB } from '../db.js';

const EditPlayerPage = (props) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState(0);
    const toast = useRef(null);

    useEffect(() => {
        playerDB.loadPlayers();
        let player = playerDB.getPlayer(props.playerId);
        setName(player.name);
        setNumber(player.number);
    }, []);

    const updatePlayer = () => {
        playerDB.updatePlayer(props.playerId, name, number);

        f7.dialog.alert(`Player ${name} - #${number} Updated.`, () => {
            props.f7router.navigate(`/roster`);
        });
    };

    return (
        <Page name="signup">
            <Navbar>
                <NavLeft>
                    <Link
                        back
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
                <Button large fill onClick={updatePlayer}>
                    Update Player
                </Button>
            </Block>

            <PageToolbar page="Roster" />
        </Page>
    )
};

export default EditPlayerPage;

import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    List,
    Block,
    ListInput,
    Button,
    useStore,
} from 'framework7-react';
import store from '../store.js';
import PageToolbar from '../components/PageLinks.jsx';

const EditPlayerPage = (props) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState({});

    store.dispatch('setCurrentPlayer', { 
        playerId: props.playerId,
    });

    const player = useStore('currentPlayer');

    useEffect(() => {
        store.dispatch('loadPlayers');

        setCurrentPlayer(player);
        setName(player.name);
        setNumber(player.number);
    }, [player]);

    const updatePlayer = () => {
        console.log(name);
        console.log(number);
    };

    return (
        <Page name="signup">
            <Navbar title="Edit Player" />

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

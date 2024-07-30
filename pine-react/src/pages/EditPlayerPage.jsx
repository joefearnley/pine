import { useState } from 'react';
import {
    Page,
    Navbar,
    List,
    Block,
    ListInput,
    Button,
} from 'framework7-react';

const EditPlayerPage = (props) => {
    const [name, setName] = useState([]);
    const [number, setNumber] = useState([]);

    console.log(props);

    const currentPlayer = useStore('player', props.playerId);

    useEffect(() => {
        store.dispatch('loadPlayers');

        setName(currentPlayer.name);
        setNumber(currentPlayer.number);
    }, [currentPlayer]);

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
                    onChange={e => setNumber(e.target.value)}
                >
                </ListInput>
            </List>

            <Block>
                <Button large fill onClick={registerAccount}>
                    Update Player
                </Button>
            </Block>
        </Page>
    )
};

export default EditPlayerPage;

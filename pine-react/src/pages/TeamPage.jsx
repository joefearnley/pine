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
import { teamDB } from '../db.js';

const TeamPage = (props) => {
    const [name, setName] = useState('');

    useEffect(() => {
        let team = teamDB.getTeam();
        setName(team.name);
    }, []);

    const updateTeam = () => {
        teamDB.updateTeam(name);

        f7.dialog.alert('Team Updated!');
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
            </List>

            <Block>
                <Button large fill onClick={updateTeam}>
                    Update Team
                </Button>
            </Block>

            <PageToolbar page="Team" />
        </Page>
    )
};

export default TeamPage;

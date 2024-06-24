import { useState } from 'react';
import axios from 'axios';
import {
    Page,
    Navbar,
    List,
    Block,
    ListInput,
    Button,
} from 'framework7-react';

const SignUpPage = () => {
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const registerAccountUrl = `${import.meta.env.VITE_BASE_API_URL}/account/register`;



    const registerAccount = async function() {
        const data = {
            name,
            email,
            password
        };

        // const response = await axios.get(registerAccountUrl).then(response => {
        //     // Login...
        // });

        const response = await fetch(registerAccountUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Success: ", result);
    }

    return (
        <Page name="signup">
            <Navbar title="Create an Account" />

            <List strongIos dividersIos insetIos>
            <ListInput
                    label="Name"
                    type="text"
                    placeholder="enter full name"
                    required
                    validate
                    clearButton
                    onChange={e => setName(e.target.value)}
                >
                </ListInput>
                <ListInput
                    label="Email Address"
                    type="email"
                    placeholder="enter email address"
                    required
                    validate
                    clearButton
                    onChange={e => setEmail(e.target.value)}
                >
                </ListInput>

                <ListInput
                    label="Password"
                    type="password"
                    placeholder="enter your password"
                    required
                    validate
                    clearButton
                    onChange={e => setPassword(e.target.value)}
                >
                </ListInput>
            </List>

            <Block>
                <Button large fill onClick={registerAccount}>
                    Create Account
                </Button>
            </Block>
        </Page>
    )
};

export default SignUpPage;

import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Toolbar,
    Link,
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
            email,
            password
        };

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
    
            <Toolbar bottom tabbar>
                <Link 
                    href="/"
                    active
                    iconIos="f7:house_fill"
                    iconMd="material:home">
                    Home
                </Link>
            </Toolbar>
        </Page>
    )
};

export default SignUpPage;

import { useState, useEffect } from 'react';
import {
    Page,
    Navbar,
    Toolbar,
    Link,
    Block,
    BlockTitle,
    List,
    ListInput,
    ListGroup,
    ListItem,
    Preloader
} from 'framework7-react';

const SignUpPage = () => {
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    console.log('loaing page..');

    const registerAccount = async function() {
        
    }

    return (
        <Page name="signup">
            <Navbar title="Sign Up" />

            <BlockTitle>Create an Account</BlockTitle>
            <List strongIos dividersIos insetIos>
            <ListInput
                label="Name"
                type="text"
                placeholder="Your name"
                info="Default validation"
                required
                validate
                clearButton
            >
            </ListInput>

            <ListInput
                label="Fruit"
                type="text"
                placeholder="Type 'apple' or 'banana'"
                required
                validate
                pattern="apple|banana"
                clearButton
            >
                <span slot="info">
                Pattern validation (<b>apple|banana</b>)
                </span>
            </ListInput>

            <ListInput
                label="E-mail"
                type="email"
                placeholder="Your e-mail"
                info="Default e-mail validation"
                required
                validate
                clearButton
            >
            </ListInput>

            <ListInput
                label="URL"
                type="url"
                placeholder="Your URL"
                info="Default URL validation"
                required
                validate
                clearButton
            >
            </ListInput>

            <ListInput
                label="Number"
                type="text"
                placeholder="Enter number"
                info="With custom error message"
                errorMessage="Only numbers please!"
                required
                validate
                pattern="[0-9]*"
                clearButton
            >
            </ListInput>
            </List>
        

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

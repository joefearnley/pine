import { App, View } from 'framework7-react';
import routes from './routes.js';

export default () => {
    return (
        <App 
            theme="auto"
            name="Pine"
            routes={routes}>
            <View main url="/" />
        </App>
    )
};

import { useEffect } from 'react';
import { App, View, useStore } from 'framework7-react';
import routes from './routes.js';
import store from './store.js'

export default () => {
    return (
        <App theme="auto" name="Pine" routes={routes}>
            <View main url="/" />
        </App>
    )
};

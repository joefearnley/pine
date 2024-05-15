import { App, View } from 'framework7-react';
import routes from './routes.js';
import store from './store.js'

export default () => {
    return (
        <App 
            theme="auto"
            name="Pine"
            routes={routes}
            store={store}>
            <View main url="/" />
        </App>
    )
};

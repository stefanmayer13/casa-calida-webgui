/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import React from 'react';
import { render } from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

import getRoutes from './routes';
import configureStore from './store/configureStore';
import {changeRoute} from './actions/routeActions';
import {fetchMessages} from './actions/messageActions';
import {setSeoInfo} from './actions/seoActions';
import history from './utils/history';

const initialState = window.__PRELOADED_STATE__;
const store = configureStore(initialState);

history.listen((location) => {
    store.dispatch(changeRoute(location));
});

const appRoot = document.getElementById('app');
const routes = getRoutes(store);

let initialDataSet;
if (initialState && initialState.coredata && initialState.coredata.messages) {
    initialDataSet = Promise.resolve(); //
} else {
    //Get messages and seoInfo before rendering if needed
    initialDataSet = Promise.all([
        store.dispatch(fetchMessages(location.pathname.split(['/'])[1])),
        store.dispatch(setSeoInfo(location.pathname))
    ]);
}

initialDataSet.then(() => {
    if (process.env.NODE_ENV !== 'production') {
        const useDevTools = false;
        const DevTools = require('./components/DevTools').default;
        window.React = React;
        console.log('Rendering App Client');
        render((
            <Provider store={store}>
                <div>
                    <Router history={history}>{routes}</Router>
                    {useDevTools ? <DevTools /> : null}
                </div>
            </Provider>), appRoot);
    } else {
        render(
            <Provider store={store}>
                <div>
                    <Router history={history}>{routes}</Router>
                </div>
            </Provider>, appRoot);
    }
});
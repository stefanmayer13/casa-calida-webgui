/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import api from '../middleware/api';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(api),
    persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
    if (typeof (window) === 'undefined') {
        return null; // only on server-render;
    }
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
    const store = finalCreateStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers'))
        );
    }
    return store;
}

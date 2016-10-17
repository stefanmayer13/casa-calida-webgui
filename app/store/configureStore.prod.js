/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import api from '../middleware/api';

const finalCreateStore = compose(
    applyMiddleware(thunk, api)
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(reducers, initialState);
}

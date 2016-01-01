/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';

const finalCreateStore = compose(
    applyMiddleware(thunk, api)
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}

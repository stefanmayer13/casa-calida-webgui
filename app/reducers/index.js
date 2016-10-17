/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { combineReducers } from 'redux';
import coredata from './coreDataReducer';
import route from './routeReducer';
import csrf from './csrfReducer';

const reducers = combineReducers({
    coredata,
    csrf,
    route,
});

export default reducers;

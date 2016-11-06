/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { combineReducers } from 'redux';
import coredata from './coreDataReducer';
import route from './routeReducer';
import csrf from './csrfReducer';
import auth from './authReducer';
import devices from './deviceReducer';

const reducers = combineReducers({
    coredata,
    csrf,
    route,
    auth,
    devices,
});

export default reducers;

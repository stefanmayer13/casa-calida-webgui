/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import * as ActionTypes from '../actions/auth';
import { combineReducers } from 'redux';

function loggedIn(state = [], action) {
    if (action.type === ActionTypes.LOGGEDIN_SUCCESS) {
        return true;
    } else if (action.type === ActionTypes.LOGGEDIN_FAILURE) {
        return false;
    }

    return state;
}

const rootReducer = combineReducers({
    loggedIn,
});

export default rootReducer;

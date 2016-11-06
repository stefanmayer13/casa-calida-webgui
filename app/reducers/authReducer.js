/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import {combineReducers} from 'redux';

import ActionTypes from '../ActionTypes';

function errors(state = [], action) {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.LOGOUT_SUCCESS:
            return [];
        case ActionTypes.LOGIN_FAILURE:
            return [action.error];
        default:
            return state;
    }
}

function loggedIn(state = false, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return true;
        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
}

function currentUser(state = null, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return action.data.token;
        case ActionTypes.LOGIN_FAILURE:
            return null;
        case ActionTypes.LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }
}

const authReducer = combineReducers({
    errors,
    loggedIn,
    currentUser,
});

export default authReducer;

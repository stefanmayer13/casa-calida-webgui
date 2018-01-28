/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import {combineReducers} from 'redux';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    LOGIN_FORCE_NEW_PASSWORD,
    LOGIN_FORCE_NEW_PASSWORD_ERROR,
} from '../ActionTypes';

function errors(state = [], action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case LOGOUT_SUCCESS:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return [];
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case LOGIN_FORCE_NEW_PASSWORD_ERROR:
        case LOGIN_FORCE_NEW_PASSWORD:
            return [action.error];
        default:
            return state;
    }
}

function isAuthenticated(state = false, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return true;
        case LOGIN_REQUEST:
        case LOGIN_FAILURE:
        case LOGOUT_SUCCESS:
        case LOGIN_FORCE_NEW_PASSWORD:
            return false;
        default:
            return state;
    }
}

function forceNewPassword(state = false, action) {
    switch (action.type) {
        case LOGIN_FORCE_NEW_PASSWORD:
            return true;
        case LOGIN_SUCCESS:
        case LOGIN_REQUEST:
        case LOGIN_FAILURE:
        case LOGOUT_REQUEST:
        case LOGOUT_SUCCESS:
            return false;
        default:
            return state;
    }
}

function tokens(state = null, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.tokens;
        case LOGIN_FORCE_NEW_PASSWORD:
        case LOGIN_FAILURE:
        case LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }
}

function userdata(state = null, action) {
    switch (action.type) {
        case LOGIN_FORCE_NEW_PASSWORD:
            return action.userdata;
        case LOGIN_FAILURE:
            return null;
        case LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }
}

function cognitoUser(state = null, action) {
    switch (action.type) {
        case LOGIN_FORCE_NEW_PASSWORD:
            return action.cognitoUser;
        case LOGIN_FAILURE:
            return null;
        case LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }
}

const authReducer = combineReducers({
    errors,
    isAuthenticated,
    tokens,
    userdata,
    forceNewPassword,
    cognitoUser,
});

export default authReducer;

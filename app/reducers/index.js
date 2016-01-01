/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';

function devices(state = [], action) {
    if (action.type === ActionTypes.DEVICES_SUCCESS) {
        return action.response;
    }

    return state;
}

function errorMessage(state = null, action) {
    const { type, error } = action;

    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return action.error;
    }

    return state;
}

const rootReducer = combineReducers({
    devices,
    errorMessage,
});

export default rootReducer;

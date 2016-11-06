/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import { combineReducers } from 'redux';
import ActionTypes from '../ActionTypes';

function devices(state = [], action) {
    switch (action.type) {
        case ActionTypes.GET_DEVICES_SUCCESS:
            return action.data.devices || [];
        case ActionTypes.GET_DEVICES_FAILURE:
            return [];
        default:
            return state;
    }
}

export default devices;
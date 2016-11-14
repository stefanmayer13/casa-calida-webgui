/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import { combineReducers } from 'redux';
import ActionTypes from '../ActionTypes';

function sensors(state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_SENSOR_DATA_SUCCESS:
            return Object.assign({}, state, {
                [action.data.id.toString()]: action.data,
            });
        case ActionTypes.GET_SENSOR_DATA_FAILURE:
            return [];
        default:
            return state;
    }
}

export default sensors;
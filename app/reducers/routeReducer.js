/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import {combineReducers} from 'redux';
import ActionTypes from '../ActionTypes';

function location(state = {}, action) {
    switch (action.type) {
        case ActionTypes.CHANGE_ROUTE:
            return action.data;
        default:
            return state;
    }
}

const routeReducer = combineReducers({
    location,
});

export default routeReducer;

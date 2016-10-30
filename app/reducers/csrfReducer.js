/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import { combineReducers } from 'redux';
import ActionTypes from '../ActionTypes';

function token(state = '', action) {
    switch (action.type) {
        case ActionTypes.SET_CSRF:
            return action.data || '';
        case ActionTypes.GET_CSRF_TOKEN_SUCCESS:
            return action.data.token || '';
        default:
            return state;
    }
}

const csrfReducer = combineReducers({
    token,
});

export default csrfReducer;

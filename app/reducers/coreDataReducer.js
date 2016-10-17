/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import {combineReducers} from 'redux';
import ActionTypes from '../ActionTypes';

function errors(state = [], action) {
    switch (action.type) {
        case ActionTypes.GET_INITIALDATA_SUCCESS:
            return [];
        case ActionTypes.GET_INITIALDATA_FAILURE:
            return [...action.errors];
        default:
            return state;
    }
}

function messages(state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_MESSAGES_SUCCESS:
            return action.data.messages || {};
        default:
            return state;
    }
}

function language(state = '', action) {
    switch (action.type) {
        case ActionTypes.SET_LANGUAGE:
            return action.language;
        case ActionTypes.GET_MESSAGES_SUCCESS:
            return action.data.language;
        default:
            return state;
    }
}

function languages(state = [], action) {
    switch (action.type) {
        case ActionTypes.GET_MESSAGES_SUCCESS:
            return action.data.languages;
        default:
            return state;
    }
}

const coredataReducer = combineReducers({
    errors,
    messages,
    language,
    languages,
});

export default coredataReducer;
/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */


import {CALL_API} from '../middleware/api';
import {
    SET_LANGUAGE,
    GET_MESSAGES,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILURE,
} from '../ActionTypes';

export function fetchMessages(language) {
    return {
        [CALL_API]: {
            types: [
                GET_MESSAGES,
                GET_MESSAGES_SUCCESS,
                GET_MESSAGES_FAILURE,
            ],
            url: `v1/messages/${language}`,
        },
    };
};

export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        language,
    };
};
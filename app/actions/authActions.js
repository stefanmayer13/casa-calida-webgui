/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import { CALL_API } from '../middleware/api';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../ActionTypes';

export function loginCall(credentials) {
    return {
        [CALL_API]: {
            types: [
                LOGIN,
                LOGIN_SUCCESS,
                LOGIN_FAILURE,
            ],
            url: `v1/login/`,
            method: 'post',
            data: credentials,
            encoding: 'form',
        },
    };
}

export function login(credentials) {
    return (dispatch) => {
        return dispatch(loginCall(credentials))
            .then(data => {
                try {
                    localStorage.setItem('authtoken', data.data.token);
                } catch (e) {}
            });
    };
}
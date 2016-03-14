/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { CALL_API } from '../middleware/api';

export const LOGGEDIN_REQUEST = 'LOGGEDIN_REQUEST';
export const LOGGEDIN_SUCCESS = 'LOGGEDIN_SUCCESS';
export const LOGGEDIN_FAILURE = 'LOGGEDIN_FAILURE';

export function isLoggedIn() {
    return (dispatch) => dispatch({
        [CALL_API]: {
            types: [LOGGEDIN_REQUEST, LOGGEDIN_SUCCESS, LOGGEDIN_FAILURE],
            endpoint: `/v1/check`,
        },
    });
}

/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

import { CALL_API } from '../middleware/api';

export const DEVICES_REQUEST = 'DEVICES_REQUEST';
export const DEVICES_SUCCESS = 'DEVICES_SUCCESS';
export const DEVICES_FAILURE = 'DEVICES_FAILURE';

function fetchDevices() {
    return {
        [CALL_API]: {
            types: [DEVICES_REQUEST, DEVICES_SUCCESS, DEVICES_FAILURE],
            endpoint: `/v1/devices`,
        },
    };
}

export function loadDevices() {
    return (dispatch) => dispatch(fetchDevices());
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export function resetErrorMessage() {
    return {
        type: RESET_ERROR_MESSAGE,
    };
}

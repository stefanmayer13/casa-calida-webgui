/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import { CALL_API } from '../middleware/api';
import {
    GET_DEVICES,
    GET_DEVICES_SUCCESS,
    GET_DEVICES_FAILURE,
    GET_SENSOR_DATA,
    GET_SENSOR_DATA_SUCCESS,
    GET_SENSOR_DATA_FAILURE
} from '../ActionTypes';

function fetchDevices() {
    return {
        [CALL_API]: {
            types: [GET_DEVICES, GET_DEVICES_SUCCESS, GET_DEVICES_FAILURE],
            url: 'v1/devices/',
        },
    };
}

export function loadDevices() {
    return dispatch => dispatch(fetchDevices());
}

export function loadSensorData(sensorId) {
    return {
        [CALL_API]: {
            types: [GET_SENSOR_DATA, GET_SENSOR_DATA_SUCCESS, GET_SENSOR_DATA_FAILURE],
            url: `v1/sensors/${sensorId}/`,
        },
    };
}

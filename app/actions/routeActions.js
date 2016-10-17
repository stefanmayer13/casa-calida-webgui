/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import {CHANGE_ROUTE} from '../ActionTypes';

export function changeRoute(location) {
    return {
        type: CHANGE_ROUTE,
        data: location,
    };
}
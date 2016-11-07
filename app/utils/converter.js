/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import moment from 'moment';

export function convertValueByType(type, value) {
    switch (type) {
        case 'bool':
            return value.toString();
        case 'datetime':
            return moment.unix(value).format('HH:mm:ss');
        default:
            return value;
    }
}
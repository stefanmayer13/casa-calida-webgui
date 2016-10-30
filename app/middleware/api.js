/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import Superagent from 'superagent';
import ActionTypes from '../ActionTypes';
import { browserHistory } from 'react-router';
import { assign, omit } from 'lodash';

const csrfHeader = 'x-csrf-token';

const withHeaders = request =>
     request.set('Accept', 'application/json')
;

function handleCSRF(store, response) {
    let header = null;
    if (response.res && response.res.header) {
        header = response.res.header[csrfHeader];
    } else if (response.header) {
        header = response.header[csrfHeader];
    }
    store.dispatch({
        type: ActionTypes.SET_CSRF,
        data: header ? header : store.getState().csrf.token,
    });
    if (typeof (window) === 'undefined') {
        return response;
    }
    if (response.res) {
        throw response;
    }
    return response;
}

function callApi(store, RequestLib, method, url, data, encoding) {
    const csrfToken = store.getState().csrf.token;

    let req = withHeaders(RequestLib[method](url)
        .withCredentials());

    if (csrfToken) {
        req = req.set(csrfHeader, csrfToken);
    }
    if ((method === 'put' || method === 'post') && !!data && encoding === 'form') {
        req.set('Content-Type', 'application/x-www-form-urlencoded');
    }
    const handleCSRFwithStore = handleCSRF.bind(null, store);
    return req.send(data).then(handleCSRFwithStore, handleCSRFwithStore);
}

export const CALL_API = Symbol('Call API');

export function createApi(baseUrl = '', RequestLib = Superagent) {
    return store => next => (action) => {
        const callAPI = action[CALL_API];
        if (typeof callAPI === 'undefined') {
            return next(action);
        }

        const {
            url,
            method = 'get',
            data = {},
            encoding,
            types: [
                requestType,
                successType,
                failureType,
                ],
            } = callAPI;

        function actionWith(data) {
            return assign(omit(action, CALL_API), data);
        }

        next(actionWith({ type: requestType, data }));
        return callApi(store, RequestLib, method, `${baseUrl}/api/${url}`, data, encoding)
            .then(response => next(actionWith({
                data: response.body,
                status: response.status,
                type: successType,
            })))
            .catch(TypeError, ReferenceError, (e) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.log(e.stack);
                }
            })
            .catch((error) => {
                let result;
                if ((error.status === 401 || error.status === 403)
                    && window.location.pathname.indexOf('/login') !== 0
                    && store.getState().auth.loggedIn) {
                    result = next({
                        type: ActionTypes.LOGIN_FAILURE,
                        error: { message: 'security.authentication.required' },
                    });
                    browserHistory.push('/login');
                } else {
                    result = next(actionWith({
                        type: failureType,
                        error: error.body && error.body.errors ? error.body.errors[0] : `Error when fetching ${url}`,
                        status: error.status,
                    }));
                }
                return result;
            });
    };
}

export default createApi();

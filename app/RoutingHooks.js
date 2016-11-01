/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import Constants from './Constants';

export function detectLanguage(nextState, replace) {
    const path = nextState.location.pathname.split('/');
    if (Constants.SUPPORTEDLANGUAGES.indexOf(path[1]) === -1) {
        replace(`/${Constants.SUPPORTEDLANGUAGES[0]}/${path.slice(1).join('/')}`);
    }
}

export function requireAuth(store, nextState, replace) {
    const isLoggedIn = store.getState().auth.loggedIn;
    if (!isLoggedIn) {
        replace({
            pathname: `/${Constants.LOGINROUTE}`,
            state: {nextPathname: nextState.location.pathname},
        });
        return true;
    }
    return false;
}

export function loginRedirect(store, nextState, replace) {
    const isLoggedIn = store.getState().auth.loggedIn;
    if (isLoggedIn) {
        replace('/');
        return true;
    }
    return false;
}

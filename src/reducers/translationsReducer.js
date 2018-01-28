/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import { TRANSLATIONS_SUCCESS } from '../ActionTypes';

const defaultData = {
    generic: {
        logout: "Logout",
    },
    home: {
        title: "Casa-Calida",
    },
    login: {
        title: "Login",
        username: "Username",
        password: "Password",
        login: "Login",
        forcenewpassword: "You have to set a new password",
        setpassword: 'Set new password'
    },
};

function translations(state = defaultData, action) {
    switch (action.type) {
        case TRANSLATIONS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

export default translations;

/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_FORCE_NEW_PASSWORD,
    LOGIN_FORCE_NEW_PASSWORD_ERROR,
    LOGOUT_SUCCESS,
} from '../ActionTypes';

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import config from '../config';

const requestLogin = (user) => ({
    type: LOGIN_REQUEST,
    user
});

export function login(credentials) {
    return (dispatch, getState) => {
        dispatch(requestLogin(credentials.username))
        //console.log(credentials);
        authenticateCognitoUser(credentials, dispatch, getState());
    };
}

export function changeForcePassword(password) {
    return (dispatch, getState) => {
        setNewForcedPassword(password, dispatch, getState());
    };
}

export function logout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

const getCognitoUser = (authenticationData) => {
    const poolData = {
        UserPoolId : config.aws.UserPoolId,
        ClientId : config.aws.ClientId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username : authenticationData.Username,
        Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return cognitoUser;
}

const authenticateCognitoUser = (credentials, dispatch, state) => {
    const authenticationData = {
        Username : credentials.username,
        Password : credentials.password,
    };

    const cognitoUser = getCognitoUser(authenticationData);
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            dispatch({
                type: LOGIN_SUCCESS,
                tokens: result,
            });
        },

        onFailure: function(err) {
            console.error(err);
            dispatch({
                type: LOGIN_FAILURE,
                error: err.message,
            });
        },

        mfaRequired: function(codeDeliveryDetails) {
            console.error("mfaRequired");
        },

        newPasswordRequired: function(userAttributes, requiredAttributes) {
            console.log(userAttributes);
            userAttributes.locale = userAttributes.locale || navigator.language || navigator.userLanguage;
            userAttributes.given_name = userAttributes.given_name || "-";
            userAttributes.family_name = userAttributes.family_name || "-";
            dispatch({
                type: LOGIN_FORCE_NEW_PASSWORD,
                userdata: userAttributes,
                cognitoUser: cognitoUser,
                error: state.translations.login.forcenewpassword
            });
        },

    });
}

const setNewForcedPassword = (newPassword, dispatch, state) => {
    const userAttributes = Object.assign({}, state.auth.userdata);
    delete userAttributes.email_verified;
    delete userAttributes.phone_number_verified;

    const cognitoUser = state.auth.cognitoUser

    cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
        onSuccess: function (result) {
            dispatch({
                type: LOGIN_SUCCESS,
                tokens: result,
            });
        },

        onFailure: function(err) {
            console.error(err);
            dispatch({
                type: LOGIN_FORCE_NEW_PASSWORD_ERROR,
                error: err.message,
            });
        },
    });
}
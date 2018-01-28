/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

 // @flow

import React from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import {login, changeForcePassword} from '../actions/authActions';
import './Login.css';

/* type Props = {
    errors: Array<object>,
    isLoggedIn: boolean,
    dispatch: func,
    login: func,
  }; */

class Login extends React.Component<Props> {

    _handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            username: this.refs.username.value,
            password: this.refs.password.value
        };
        this.props
            .login(loginData);
        return false;
    };

    _handlePasswordChange = (e) => {
        e.preventDefault();
        this.props
            .changeForcePassword(this.refs.newpassword.value);
        return false;
    };

    render() {
        if (this.props.isAuthenticated) {
            const from = this.props.location.state.from || '/';
            return (
                <Redirect to={from}/>
            )
        }
        return (
            <div className="container">
                <h1>{this.props.translations.login.title}</h1>
                {!this.props.forceNewPassword ? (
                    <form onSubmit={this._handleLogin}>
                        {this.props.errors.map((error, index) => <div key={index}>{error}</div>)}
                        <div className="field">
                            <input type="text" name="username" placeholder={this.props.translations.login.username} ref="username" />
                        </div>
                        <div className="field"> 
                            <input type="password" name="password" placeholder={this.props.translations.login.password} ref="password" />
                        </div>
                        <button className="button button--primary" type="submit">{this.props.translations.login.login}</button>
                    </form>
                ) : (
                    <form onSubmit={this._handlePasswordChange}>
                        {this.props.errors.map((error, index) => <div key={index}>{error}</div>)}
                        <div className="field"> 
                            <input type="password" name="password" placeholder={this.props.translations.login.password} ref="newpassword" />
                        </div>
                        <button className="button button--primary" type="submit">{this.props.translations.login.setpassword}</button>
                    </form>
                )}
            </div>
        );
    }
}

function select(state) {
    return {
        translations: state.translations,
        isAuthenticated: state.auth.isAuthenticated,
        forceNewPassword: state.auth.forceNewPassword,
        errors: state.auth.errors,
    };
}

const actions = {
    login,
    changeForcePassword,
};

export default withRouter(connect(select, actions)(Login));

/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import {connect} from 'react-redux';
import {login} from '../actions/authActions';
import Message from '../components/atoms/Message';
import Link from '../components/atoms/LanguageLink';
import history from '../utils/history';

const {
    arrayOf,
    bool,
    object,
    func,
    } = React.PropTypes;

class Login extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        errors: arrayOf(object),
        isLoggedIn: bool,
        dispatch: func,
        login: func,
    };

    static defaultProps = {
        errors: [],
    };

    _handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            username: this.refs.username.value,
            password: this.refs.password.value
        };
        this.props
            .login(loginData)
            .then(() => {
                if (this.props.isLoggedIn) {
                    history.replace('/');
                }
            });
        return false;
    };

    render() {
        return (
            <div className="container">
                <h1><Message code="login.title" /></h1>
                <form onSubmit={this._handleSubmit}>
                    <div className="field">
                        <input type="text" name="username" placeholder="Username" ref="username" />
                    </div>
                    <div className="field">
                        <input type="password" name="password" placeholder="Password" ref="password" />
                    </div>
                    <button className="button button--primary" type="submit">Log in</button>
                </form>
            </div>
        );
    }
}

function select(state) {
    return {
        isLoggedIn: state.auth.loggedIn,
        errors: state.auth.errors,
    };
}

const actions = {
    login,
};

export default connect(select, actions)(Login);

/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

 // @flow

import React from 'react';
import { connect } from 'react-redux';
import './Home.css';

import {logout} from '../actions/authActions';

class Home extends React.Component<Props> {

    render() {
        return (
            <div className="container">
                <h1>{this.props.translations.home.title}</h1>
                <button onClick={this.props.logout}>{this.props.translations.generic.logout}</button>
            </div>
        );
    }
}

function select(state) {
    return {
        translations: state.translations,
    };
}

const actions = {
    logout,
}

export default connect(select, actions)(Home);

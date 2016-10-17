/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {connect} from 'react-redux';
import {fetchMessages} from '../actions/messageActions';
import {setSeoInfo} from '../actions/seoActions';
import LanguageSwitch from './LanguageSwitch';

const {
    array,
    object,
    func,
    string,
    } = React.PropTypes;

class App extends React.Component {
    static childContextTypes = {
        getMessage: func,
        getLanguage: func,
    };

    static propTypes = {
        routes: array,
        children: object,
        messages: object,
        language: string,
        path: string,
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.params.language !== nextProps.params.language) {
            this.props.fetchMessages(nextProps.params.language);
        }
        if (this.props.path !== nextProps.path) {
            this.props.setSeoInfo(nextProps.path);
        }
    }

    getChildContext() {
        return {
            getMessage: (key) => {
                return this.props.messages[key] || `[${key}]`;
            },
            getLanguage: () => {
                return this.props.params.language;
            },
        };
    }

    render() {
        return (
            <div className='app'>
                <header>
                    Header
                    <LanguageSwitch />
                </header>
                {this.props.children}
            </div>
        );
    }
}

const actions = {
    fetchMessages,
    setSeoInfo,
};

function select(state) {
    return {
        messages: state.coredata.messages,
        language: state.coredata.language,
        path: state.route.location.pathname || '',
    };
}

export default connect(select, actions)(App);

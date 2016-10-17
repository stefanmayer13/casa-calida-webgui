/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {connect} from 'react-redux';

class LanguageSwitch extends React.Component {

    static propTypes = {
        path: React.PropTypes.string.isRequired,
        languages: React.PropTypes.array.isRequired,
    };

    render() {
        const path = '/' + this.props.path.split('/').slice(2).join('/');
        return (
            <ul>
                {this.props.languages.map(language => {
                    return <li key={language}><a href={'/' + language + path}>{language}</a></li>;
                })}
            </ul>
        );
    }
}

function select(state) {
    return {
        languages: state.coredata.languages,
        path: state.route.location.pathname || '',
    };
}

export default connect(select)(LanguageSwitch);
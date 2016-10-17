/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {connect} from 'react-redux';
import {shouldPureComponentUpdate} from 'react-pure-render';
import {Link} from 'react-router';

const {
    string,
    func,
    bool,
    any,
    } = React.PropTypes;

class LanguageLink extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static contextTypes = {
        getLanguage: func.isRequired,
    };

    static propTypes = {
        to: string.isRequired,
        children: any,
        activeClassName: string,
        activeStyle: string,
        onClick: func,
        onlyActiveOnIndex: bool,
    };

    render() {
        return <Link to={'/' + this.props.language + this.props.to} activeClassName={this.props.activeClassName}
                     activeStyle={this.props.activeStyle} onClick={this.props.onClick}
                     onlyActiveOnIndex={this.props.onlyActiveOnIndex}>{this.props.children || null}</Link>;
    }
}

function select(state) {
    return {
        language: state.coredata.language,
    };
}

export default connect(select)(LanguageLink);
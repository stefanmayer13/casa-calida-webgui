/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';

class Message extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static contextTypes = {
        getMessage: React.PropTypes.func.isRequired,
    };

    static propTypes = {
        className: React.PropTypes.string,
        code: React.PropTypes.string.isRequired,
    };

    render() {
        return React.DOM.span({
            className: this.props.className,
            dangerouslySetInnerHTML: {
                __html: this.context.getMessage(this.props.code),
            },
        });
    }
}

export default Message;

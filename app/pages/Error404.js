/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import {shouldPureComponentUpdate} from 'react-pure-render';
import Message from '../components/atoms/Message';
import Link from '../components/atoms/LanguageLink';

class Error404 extends React.Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (<div><Message code="notfound" /><br /><Link to="/"><Message code="home" /></Link></div>);
    }
}

export default Error404;

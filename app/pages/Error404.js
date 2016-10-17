/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import Message from '../components/atoms/Message';
import Link from '../components/atoms/LanguageLink';

export default React.createClass({
    render() {
        return (<div><Message code="notfound" /><br/><Link to="/"><Message code="home" /></Link></div>);
    },
});

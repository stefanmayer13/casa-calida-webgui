/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import Message from '../components/atoms/Message';
import Link from '../components/atoms/LanguageLink';

const Dashboard = React.createClass({
    render() {
        return (<div>
          <p><Message code="dashboard.welcome" /></p>
        </div>);
    },
});

export default Dashboard;

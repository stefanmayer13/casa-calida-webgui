/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import * as RoutingHooks from './RoutingHooks';
import Constants from './Constants';

const routes = store => {
    const requireAuth = RoutingHooks.requireAuth.bind(null, store);
    const loginRedirect = RoutingHooks.loginRedirect.bind(null, store);

    return (
       <Route path="/(:language)" component={App} onEnter={RoutingHooks.detectLanguage}>
           <Route path={Constants.LOGINROUTE} component={Login} onEnter={loginRedirect}/>
           <Route path="/**/*" component={Error404} />
           <IndexRoute component={Dashboard} onEnter={requireAuth}/>
       </Route>
    );
};

export default routes;

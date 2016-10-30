/**
 * @author <a href="mailto:stefan@stefanmayer.me">Stefan Mayer</a>
 */

import React from 'react';
import App from './components/App';
import { Route, IndexRoute } from 'react-router';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';

const routes = store =>
     (
       <Route path="/(:language)" component={App}>
         <IndexRoute component={Dashboard} />
         <Route path="*" component={Error404} />
       </Route>
    )
;

export default routes;

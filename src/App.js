import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux';

import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ConnectedPrivateRoute exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )}/>
)

const ConnectedPrivateRoute = withRouter(connect(mapStateToProps)(PrivateRoute));

export default connect(mapStateToProps)(App);

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RequireAuth from '../auth/require-auth';

import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import PageNotFound from '../pages/PageNotFound';
import Login from '../auth/login';
import Register from '../auth/register';

class ContentContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default ContentContainer;

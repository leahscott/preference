import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import PageNotFound from '../pages/PageNotFound';

class ContentContainer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default ContentContainer;

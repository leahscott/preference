import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import RequireAuth from './auth/require-auth';
import styled from 'styled-components';

import Dashboard from './pages/Dashboard';
import EditPoll from './poll/edit';
import HomePage from './pages/HomePage';
import Login from './auth/login';
import PageNotFound from './pages/PageNotFound';
import Register from './auth/register';
import Poll from './poll/show';

class ContentContainer extends React.Component {
  homepageOrDashboard = () => {
    if (this.props.authenticated) {
      return RequireAuth(Dashboard);
    } else {
      return HomePage;
    }
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={this.homepageOrDashboard()} />

        <Route exact path="/polls/:id/edit" component={RequireAuth(EditPoll)} />
        <Route exact path="/polls/:id" component={RequireAuth(Poll)} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2em;
`;

export default withRouter(connect(mapStateToProps)(ContentContainer));

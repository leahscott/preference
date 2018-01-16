import React from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivide,
  Button
} from '@blueprintjs/core';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';

class Header extends React.Component {
  render() {
    const { authenticated, logoutUser } = this.props;

    return (
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>AltVote</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align="right">
          <Button className="pt-minimal" iconName="home">
            <Link to="/">Home</Link>
          </Button>
          {authenticated
            ? <Button
                className="pt-minimal"
                onClick={logoutUser}
                iconName="log-out"
              >
                Logout
              </Button>
            : <div>
                <Button className="pt-minimal" iconName="log-in">
                  <Link to="login">Login</Link>
                </Button>
                <Button className="pt-minimal">
                  <Link to="register">Register</Link>
                </Button>
              </div>}
        </NavbarGroup>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));

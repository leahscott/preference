import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';

class Header extends React.Component {
  render() {
    const { authenticated, logoutUser } = this.props;

    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {authenticated
            ? <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            : <li>
                <Link to="/login">Login</Link> or
                <Link to="/register">Register</Link>
              </li>}
        </ul>
      </div>
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

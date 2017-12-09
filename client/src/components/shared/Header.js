import React from 'react';
import { Link } from 'react-router-dom';
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
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          {authenticated &&
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { logoutUser })(Header);

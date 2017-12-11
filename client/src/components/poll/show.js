import React from 'react';
import PropTypes from 'prop-types';

class MyPolls extends React.Component {
  static propTypes = {
    polls: PropTypes.array
  };

  renderPolls = () => {
    const { polls } = this.props;
    return polls.map(poll =>
      <li key={poll._id}>
        {poll._id}
      </li>
    );
  };

  render() {
    const { polls } = this.props;
    return (
      <div>
        {polls.length ? this.renderPolls() : <h3>No Polls Yet</h3>}
      </div>
    );
  }
}

export default MyPolls;

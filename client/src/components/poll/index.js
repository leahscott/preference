import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MyPolls extends React.Component {
  static propTypes = {
    polls: PropTypes.array
  };

  renderStatus(status) {
    if (status === 'open') {
      return <span> (Open)</span>;
    } else if (status === 'draft') {
      return <span> (Draft)</span>;
    } else {
      return <span> (Closed)</span>;
    }
  }

  renderPolls = () => {
    const { polls } = this.props;
    return polls.map(poll =>
      <li key={poll._id}>
        <Link to={`poll/${poll.slug}/edit`}>
          {poll.slug}
        </Link>
        {this.renderStatus(poll.status)}
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

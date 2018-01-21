import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import momentDurationFormatSetup from 'moment-duration-format';

class MyPolls extends React.Component {
  static propTypes = {
    polls: PropTypes.array
  };

  timeRemaining(expirationDate) {
    momentDurationFormatSetup(moment);
    const diff = moment(expirationDate).diff(moment());
    return moment.duration(diff).format();
  }

  renderStatus(poll) {
    if (poll.status === 'open') {
      return (
        <strong>
          {this.timeRemaining(poll.expirationDate)} remaining
        </strong>
      );
    } else if (poll.status === 'draft') {
      return <strong>Draft</strong>;
    } else {
      return <strong>Closed</strong>;
    }
  }

  renderPolls = () => {
    const { polls } = this.props;
    return polls.map(poll =>
      <div key={poll._id}>
        <div>
          <Link to={`polls/${poll.slug}/edit`}>
            {poll.title || 'Untitled'}
          </Link>
        </div>

        {this.renderStatus(poll)}
      </div>
    );
  };

  render() {
    const { polls } = this.props;
    return (
      <div>
        <h3>My Polls:</h3>
        {polls.length ? this.renderPolls() : <h3>No Polls Yet</h3>}
      </div>
    );
  }
}

export default MyPolls;

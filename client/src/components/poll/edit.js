import React from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import PublishModal from './PublishModal';

class EditPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: null,
      showModal: false
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:3001/api/polls/${id}`).then(res => {
      this.setState({ poll: res.data });
    });
  };

  renderActions = () => {
    const { poll } = this.state;
    if (poll.status === 'draft') {
      return <button onClick={this.handleOpenModal}>Publish Poll</button>;
    } else if (poll.status === 'open') {
      return <button>Close Poll</button>;
    }
  };

  handleTitleChange = e => {
    const { title, ...otherProps } = this.state.poll;

    this.setState({
      poll: {
        title: e.target.value,
        ...otherProps
      }
    });
  };

  publish = expirationDate => {
    const { poll } = this.state;
    poll.status = 'open';
    poll.expirationDate = expirationDate;
    axios.put(`http://localhost:3001/api/polls/${poll.slug}`, poll).then(() => {
      this.setState({ poll });
    });
  };

  submit = e => {
    const { poll } = this.state;
    e.preventDefault();
    axios.put(`http://localhost:3001/api/polls/${poll.slug}`, poll).then(() => {
      NotificationManager.success('Your poll has been updated', null, 2000);
    });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { poll, showModal } = this.state;
    if (poll) {
      return (
        <div>
          <div>
            Start editing your new poll! <br />
            This poll's status is: {poll.status}
          </div>

          <form onSubmit={this.submit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={poll.title}
              onChange={this.handleTitleChange}
            />

            <button type="submit">Save</button>
          </form>

          {this.renderActions()}

          <PublishModal
            show={showModal}
            handleClose={this.handleCloseModal}
            handlePublish={this.publish}
            published={poll.status === 'open'}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default EditPoll;

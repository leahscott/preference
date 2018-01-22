import React from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import PublishModal from './PublishModal';
import { Redirect, Link } from 'react-router-dom';
import Button from '../shared/Button';
import moment from 'moment';

class EditPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: null,
      showModal: false,
      close: false
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
      return <Button onClick={this.handleOpenModal}>Publish Poll</Button>;
    } else if (poll.status === 'open') {
      return <Button onClick={this.close}>Close Poll</Button>;
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
    poll.publishDate = moment();
    this.update(poll, () => {
      this.setState({ poll });
    });
  };

  update = (poll, callback) => {
    axios
      .put(`http://localhost:3001/api/polls/${poll.slug}`, poll)
      .then(callback);
  };

  submit = e => {
    const { poll } = this.state;
    e.preventDefault();
    this.update(poll, () => {
      this.setState({ poll });
      NotificationManager.success('Your poll has been updated', null, 2000);
    });
  };

  close = () => {
    const { poll } = this.state;
    poll.status = 'closed';
    poll.expirationDate = moment();
    this.update(poll, () => {
      this.setState({ close: true });
    });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { poll, showModal, close } = this.state;
    if (poll) {
      return (
        <div>
          {close &&
            <Redirect
              to={{
                pathname: '/',
                state: {
                  message: 'Your poll has been closed',
                  type: 'success'
                }
              }}
            />}

          <p>
            <Link to="/">← Back to Dashboard</Link>
          </p>
          <p>
            This poll's status is: <strong>{poll.status}</strong>
          </p>

          <form onSubmit={this.submit} style={{ marginBottom: 40 }}>
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
            poll={poll}
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

import React from 'react';
import axios from 'axios';

class EditPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:3001/api/polls/${id}`).then(res => {
      this.setState({ poll: res.data, loading: false });
    });
  };

  publish = () => {
    const { slug } = this.state.poll;
    axios.post(`http://localhost:3001/api/polls/${slug}/publish`).then(res => {
      this.setState({ poll: res.data });
    });
  };

  render() {
    const { poll, loading } = this.state;
    if (!loading) {
      return (
        <div>
          <div>
            Start editing your new poll! <br />
            This is your Poll Id: {poll.slug} <br />
            This poll's status is: {poll.status}
          </div>

          {poll.status !== 'open' &&
            <button onClick={this.publish}>Publish</button>}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default EditPoll;

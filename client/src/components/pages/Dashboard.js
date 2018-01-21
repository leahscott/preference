import React from 'react';
import { Redirect } from 'react-router-dom';
import MyPolls from '../poll';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      polls: [],
      newPollSlug: false
    };
  }

  componentDidMount = () => {
    const cookies = new Cookies();
    axios
      .get('http://localhost:3001/api/polls', {
        headers: { Authorization: cookies.get('token') }
      })
      .then(res => {
        this.setState({ loading: false, polls: res.data.polls });
      });
  };

  createPoll = () => {
    const cookies = new Cookies();
    axios
      .post('http://localhost:3001/api/polls', {
        token: cookies.get('token')
      })
      .then(res => {
        this.setState({ newPollSlug: res.data.slug });
      });
  };

  render() {
    const { loading, polls, newPollSlug } = this.state;
    return (
      <div>
        {loading ? <h3>Loading...</h3> : <MyPolls polls={polls} />}
        <button onClick={this.createPoll}>Create new poll</button>

        {newPollSlug && <Redirect to={`/polls/${newPollSlug}/edit`} />}
      </div>
    );
  }
}

export default Dashboard;

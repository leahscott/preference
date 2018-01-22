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
      polls: []
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

  render() {
    const { loading, polls } = this.state;
    return loading ? <h3>Loading...</h3> : <MyPolls polls={polls} />;
  }
}

export default Dashboard;

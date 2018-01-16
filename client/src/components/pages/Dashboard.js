import React from 'react';
import { Link } from 'react-router-dom';
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

  componentDidMount() {
    const cookies = new Cookies();
    axios
      .get(`http://127.0.0.1:3001/api/dashboard`, {
        headers: { Authorization: cookies.get('token') }
      })
      .then(res => {
        this.setState({ loading: false, polls: res.data.polls });
      });
  }

  render() {
    const { loading, polls } = this.state;
    return (
      <div>
        {loading ? <h3>Loading...</h3> : <MyPolls polls={polls} />}
        <Link to="poll/create">+ Create New Poll</Link>;
      </div>
    );
  }
}

export default Dashboard;

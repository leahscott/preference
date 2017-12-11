import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createEmptyPoll();
  }

  createEmptyPoll() {
    const cookies = new Cookies();

    return axios
      .get('http://localhost:3001/api/polls/new', {
        headers: { Authorization: cookies.get('token') }
      })
      .then(res => this.setState({ pollSlug: res.data.slug }));
  }

  render() {
    const { pollSlug } = this.state;
    return pollSlug ? <Redirect to={`${pollSlug}/edit`} /> : null;
  }
}

export default CreatePoll;

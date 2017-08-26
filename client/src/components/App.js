import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { colors } from './shared/constants';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      header: '',
      subheader: '',
    };
  }

  componentDidMount() {
    axios.get('/api')
      .then((res) => {
        this.setState({ 
          header: res.data.header,
          subheader:  res.data.subheader
        });
      });
  }

  render() {
    const { header, subheader } = this.state;
    return (
      <Greeting>
        { header }<br/>
        { subheader }
      </Greeting>
    );
  }
}

const Greeting = styled.h1`
  color: ${colors.red};
  margin: 60px auto;
  text-align: center;
  max-width: 650px;
`;

export default App;

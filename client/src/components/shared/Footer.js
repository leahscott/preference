import React from 'react';
import styled from 'styled-components';

class Footer extends React.Component {
  render() {
    return <Wrapper />;
  }
}

const Wrapper = styled.div`
  background: lightgray;
  height: 50px;
  margin-top: 30px;
`;

export default Footer;

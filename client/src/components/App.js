import React from 'react';
import Routes from './Routes';
import Header from './shared/Header';
import Footer from './shared/Footer';
import styled from 'styled-components';
import { NotificationContainer } from 'react-notifications';

class App extends React.Component {
  render() {
    return (
      <div>
        <NotificationContainer />
        <Header />
        <Wrapper>
          <Routes />
        </Wrapper>
        <Footer />
      </div>
    );
  }
}

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2em;
`;

export default App;

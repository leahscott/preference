import React from 'react';
import Header from './shared/Header';
import ContentContainer from './shared/ContentContainer';
import Footer from './shared/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ContentContainer />
        <Footer />
      </div>
    );
  }
}

export default App;

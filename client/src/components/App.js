import React from 'react';
import Routes from './Routes';
import Header from './shared/Header';
import Footer from './shared/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;

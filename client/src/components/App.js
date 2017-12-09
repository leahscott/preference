import React from 'react';
import Header from './shared/Header';
import ComponentRoutes from './shared/ComponentRoutes';
import Footer from './shared/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ComponentRoutes />
        <Footer />
      </div>
    );
  }
}

export default App;

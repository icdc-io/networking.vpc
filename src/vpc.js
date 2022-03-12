import React, { useEffect } from 'react';
import NetworksOverview from './components/overview';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Lang from './Lang';
import { VpcStore } from './AppReducer';
// import './App.scss';

const Balancer = ({ store }) => {
  useEffect(() => {
    store.injectReducer('VpcStore', VpcStore);
  }, []);

  return <Provider store={store}>
    <Router>
      <Lang>
        <NetworksOverview />
      </Lang>
    </Router>
  </Provider>;
};

export default Balancer;

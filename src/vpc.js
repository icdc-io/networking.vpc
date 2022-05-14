import React, { useEffect } from 'react';
import NetworksOverview from './components/overview';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { VpcStore } from './AppReducer';
import './App.scss';

const Vpc = ({ store, t }) => {
  useEffect(() => {
    store.injectReducer('VpcStore', VpcStore);
  }, []);

  return (
    <Provider store={store}>
      <Router basename={process.env.NODE_ENV === 'production' ? '/networking' : ''}>
        <NetworksOverview t={t} />
      </Router>
    </Provider>
  );
};

export default Vpc;

import React, { useEffect, useState } from "react";
import NetworksOverview from "./components/overview";
import { Provider } from "react-redux";
import { VpcStore } from "./AppReducer";
import { Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./App.scss";

const Vpc = ({ store }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    store.injectReducer("VpcStore", VpcStore);
    setIsLoaded(true);
  }, []);

  return (
    <Provider store={store}>
      {isLoaded ? <NetworksOverview /> : <Loader active inline="centered" />}
    </Provider>
  );
};

Vpc.propTypes = {
  store: PropTypes.object,
};

export default Vpc;

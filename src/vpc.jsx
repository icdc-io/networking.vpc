import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { VpcStore } from "./AppReducer";
import NetworksOverview from "./components/overview";
import "./App.scss";

const Vpc = ({ store }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    store.injectReducer("VpcStore", VpcStore);
    setIsLoaded(true);
  }, []);

  return isLoaded ? <NetworksOverview /> : <Loader active inline="centered" />;
};

Vpc.propTypes = {
  store: PropTypes.object,
};

export default Vpc;

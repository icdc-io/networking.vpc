import Loader from "container/Loader";
import { useEffect, useState } from "react";
import { VpcStore } from "./AppReducer";
import NetworksOverview from "./components/overview";
import "./App.scss";

const Vpc = ({ store }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		store.injectReducer("VpcStore", VpcStore);
		setIsLoaded(true);
	}, []);

	return isLoaded ? <NetworksOverview /> : <Loader />;
};

export default Vpc;

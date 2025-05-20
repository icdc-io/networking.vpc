import { Button } from "container/Button";
import ErrorScreen from "container/ErrorScreen";
import Loader from "container/Loader";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
	fetchNetwork,
	fetchProvider,
	fetchSecurityGroup,
	fetchSecurityGroups,
} from "../../AppActions";
import NetworkDetailsContent from "./networkDetailsContent";

const NetworkDetails = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const network = useSelector((state) => state.VpcStore.network);
	const networkFetchStatus = useSelector(
		(state) => state.VpcStore.networkFetchStatus,
	);
	const group = useSelector((state) => state.VpcStore.group);
	// const groupFetchStatus = useSelector(
	//   (state) => state.VpcStore.groupFetchStatus,
	// );
	const providerId = useSelector((state) => state.VpcStore.providerId);
	const providerIdFetchStatus = useSelector(
		(state) => state.VpcStore.providerIdFetchStatus,
	);
	const user = useSelector((state) => state.host.user);

	const dispatch = useDispatch();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		dispatch(fetchNetwork(id));
		dispatch(fetchSecurityGroups());
		dispatch(fetchSecurityGroup(id));
		providerIdFetchStatus !== "fulfilled" && dispatch(fetchProvider());
	}, [dispatch, id, user]);

	const statuses = [providerIdFetchStatus, networkFetchStatus];

	const isError = statuses.includes("rejected") || statuses.includes("");

	const isLoading = statuses.includes("pending");

	return (
		<>
			<div className="row content-page__header">
				<Link to={".."} relative="path" replace>
					<Button variant="back" size="lg">
						{t("back")}
					</Button>
				</Link>
			</div>
			{isError ? (
				<ErrorScreen />
			) : isLoading ? (
				<Loader />
			) : (
				<NetworkDetailsContent items={[network, group, providerId, user]} />
			)}
		</>
	);
};

export default NetworkDetails;

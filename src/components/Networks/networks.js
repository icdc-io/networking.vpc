import Loader from "container/Loader";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "semantic-ui-react";
import { fetchNetworks, fetchProvider, fetchVMs } from "../../AppActions";
import { networksUrl } from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
import { networkValue } from "../../constants/common";
import VpcApiButton from "../VpcApiButton";
import NetworkModal from "./networkModal";
import NetworksList from "./networksList";

import ErrorScreen from "container/ErrorScreen";

const Networks = () => {
	const { t } = useTranslation();
	const networks = useSelector((state) => state.VpcStore.networks);
	const networksFetchStatus = useSelector(
		(state) => state.VpcStore.networksFetchStatus,
	);
	const vms = useSelector((state) => state.VpcStore.assignedVms);
	const vmsFetchStatus = useSelector(
		(state) => state.VpcStore.assignedVmsFetchStatus,
	);
	const providerIdFetchStatus = useSelector(
		(state) => state.VpcStore.providerIdFetchStatus,
	);
	const [search, setSearch] = useState("");
	const user = useSelector((state) => state.host.user);
	const providerId = useSelector((state) => state.VpcStore.providerId);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchNetworks());
		dispatch(fetchVMs());
		providerIdFetchStatus !== "fulfilled" && dispatch(fetchProvider());
	}, [dispatch, user]);

	const isNoData = networks.length < 1;

	const statuses = [vmsFetchStatus, networksFetchStatus, providerIdFetchStatus];

	const isError = statuses.includes("rejected");

	const isLoading = statuses.includes("pending");

	return (
		<>
			<>
				<h4 className="ui header">{t("vpcNetworks")}</h4>
				<div style={{ maxWidth: "600px" }}>
					<p className="color--grey">{t("vpcDescription")}</p>
				</div>
				<div className="vpcDescription">
					<div>
						<p style={{ fontWeight: "700" }}>{t("search")}</p>
						{!isError && !isLoading && (
							<Input
								icon="search"
								iconPosition="left"
								placeholder={t("searchField")}
								value={search}
								onChange={(e) => setSearch(e.currentTarget.value)}
							/>
						)}
					</div>
					<div className="buttons-vpc">
						<VpcApiButton
							info={apiButtonInfo.network(networkValue)}
							url={networksUrl(providerId)}
						/>
						<NetworkModal />
					</div>
				</div>
				{isError ? (
					<ErrorScreen />
				) : isLoading ? (
					<Loader />
				) : isNoData ? (
					<div style={{ maxWidth: "600px" }}>
						<p className="color--grey">{t("vpcDescription")}</p>
					</div>
				) : (
					<NetworksList items={[vms, networks]} search={search} />
				)}
			</>
		</>
	);
};

export default Networks;

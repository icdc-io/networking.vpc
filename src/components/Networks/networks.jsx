import { Button } from "container/Button";
import ErrorScreen from "container/ErrorScreen";
import { Input } from "container/Input";
import Loader from "container/Loader";
import { OPERATOR, isAdminRights } from "container/roleUtils";
import { Meh } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchNetworks,
	fetchProvider,
	fetchVMs,
	getFullPath,
} from "../../AppActions";
import {
	ASSIGNED_VMS,
	NETWORKS_FETCH_URL,
	PROVIDER_ID_URL,
	networksUrl,
} from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
import { networkValue } from "../../constants/common";
import VpcApiButton from "../VpcApiButton";
import NetworkModal from "./networkModal";
import NetworksList from "./networksList";

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
	const createModalRef = useRef();

	const dispatch = useDispatch();

	const onCreateModal = () => {
		if (createModalRef.current) {
			createModalRef.current.handleClick();
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		dispatch(fetchNetworks());
		dispatch(fetchVMs());
		providerIdFetchStatus !== "fulfilled" && dispatch(fetchProvider());
	}, [dispatch, user]);

	const isNoData = networks.length === 0;

	const statuses = [vmsFetchStatus, networksFetchStatus, providerIdFetchStatus];

	const isError = statuses.includes("rejected");

	const isLoading = statuses.includes("pending");

	const getContent = () => {
		if (isError) return <ErrorScreen />;
		if (isLoading) return <Loader />;
		if (isNoData)
			return (
				<div className="noContent">
					<Meh className="m-auto" size={54} />
					<h3>{t("noNetworks")}</h3>
				</div>
			);
		return <NetworksList items={[vms, networks]} search={search} />;
	};

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
						<Input
							placeholder={t("searchField")}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							disabled={isError || isLoading}
						/>
					</div>
					<div className="buttons-vpc">
						<VpcApiButton
							info={apiButtonInfo.network(networkValue)}
							url={networksUrl(providerId)}
						/>
						{isAdminRights(user.role) && (
							<Button onClick={onCreateModal} disabled={user.role === OPERATOR}>
								{t("createVps")}
							</Button>
						)}
					</div>
				</div>
				{getContent()}
				<NetworkModal ref={createModalRef} />
			</>
		</>
	);
};

export default Networks;

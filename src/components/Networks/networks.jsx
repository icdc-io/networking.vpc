import { Button } from "container/Button";
import ErrorScreen from "container/ErrorScreen";
import { Input } from "container/Input";
import Loader from "container/Loader";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "container/Table";
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
import { onSearch } from "../../utilities/search";
import VpcApiButton from "../VpcApiButton";
import NetworkModal from "./networkModal";
import NetworksList from "./networksList";

const tableHeader = ["name", "subnet", "type", "dns", "assignedVmNics", ""];

const Networks = () => {
	const { t } = useTranslation();
	const networks = useSelector((state) => state.VpcStore.networks);
	const networksFetchStatus = useSelector(
		(state) => state.VpcStore.networksFetchStatus,
	);
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

	const statuses = [vmsFetchStatus, networksFetchStatus, providerIdFetchStatus];

	const isError = statuses.includes("rejected");

	const isLoading = statuses.includes("pending");

	const getContent = () => {
		const items = onSearch(networks, search);

		if (!isError && !isLoading && items.length > 0)
			return <NetworksList items={items} />;

		return (
			<TableCell colSpan={100}>
				<div className="noContent">
					{isError ? (
						<ErrorScreen />
					) : isLoading ? (
						<div className="m-auto">
							<Loader />
						</div>
					) : (
						<div className="m-auto">
							<Meh className="m-auto" size={54} />
							<h3>{t("noNetworks")}</h3>
						</div>
					)}
				</div>
			</TableCell>
		);
	};

	const tableHeaderCells = tableHeader.map((header) => (
		<TableHead key={header}>{t(header)}</TableHead>
	));

	return (
		<>
			<>
				<h2 className="page-title">{t("vpcNetworks")}</h2>
				<div style={{ maxWidth: "600px" }}>
					<p className="color--grey">{t("vpcDescription")}</p>
				</div>
				<div className="vpcDescription">
					<div>
						<Input
							placeholder={t("search")}
							value={search}
							variant="search"
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

				<div className="table-container">
					<Table>
						<TableHeader>
							<TableRow>{tableHeaderCells}</TableRow>
						</TableHeader>
						<TableBody>{getContent()}</TableBody>
					</Table>
				</div>
				<NetworkModal ref={createModalRef} />
			</>
		</>
	);
};

export default Networks;

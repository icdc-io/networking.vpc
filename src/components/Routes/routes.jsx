import { Button } from "container/Button";
import { Input } from "container/Input";
import Loader from "container/Loader";
import { isAdminRights, OPERATOR } from "container/roleUtils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "container/Table";
import { Meh } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvider, fetchRoutes } from "../../AppActions";
import { routerUrl } from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
import { routesValue } from "../../constants/common";
import { onSearch } from "../../utilities/search";
import VpcApiButton from "../VpcApiButton";
import RouteModal from "./routeModal";
import RoutesList from "./routesList";

const headers = ["subnet", "gateway", "type", ""];

const Routes = () => {
	const { t } = useTranslation();
	const routes = useSelector((state) => state.VpcStore.routes);
	const routesFetchStatus = useSelector(
		(state) => state.VpcStore.routesFetchStatus,
	);
	const providerIdFetchStatus = useSelector(
		(state) => state.VpcStore.providerIdFetchStatus,
	);
	const user = useSelector((state) => state.host.user);
	const routerId = useSelector((state) => state.VpcStore.routerId);
	const [search, setSearch] = useState("");
	const modalRef = useRef();

	const dispatch = useDispatch();

	const onCreate = () => {
		if (modalRef.current) {
			modalRef.current.handleClick();
		}
	};

	useEffect(() => {
		dispatch(fetchRoutes());
		providerIdFetchStatus !== "fulfilled" && dispatch(fetchProvider());
	}, [dispatch, user]);

	const statuses = [routesFetchStatus, providerIdFetchStatus];

	const isError = statuses.includes("rejected");

	const isLoading = statuses.includes("pending");

	const getContent = () => {
		const items = onSearch(routes, search);

		if (!isError && !isLoading && items.length > 0)
			return <RoutesList items={items} />;

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
							<h3>{t("noRoutes")}</h3>
						</div>
					)}
				</div>
			</TableCell>
		);
	};

	const tableHeaderCells = headers.map((header, index) => (
		<TableHead key={index}>{t(header)}</TableHead>
	));

	return (
		<>
			<h2 className="page-title">{t("routes")}</h2>
			<div className="vpcDescription">
				<div>
					<Input
						variant="search"
						// iconPosition="left"
						placeholder={t("search")}
						value={search}
						onChange={(e) => setSearch(e.currentTarget.value)}
					/>
				</div>
				<div className="buttons-vpc">
					<VpcApiButton
						info={apiButtonInfo.route(routesValue)}
						url={routerUrl(routerId)}
					/>
					{isAdminRights(user.role) && (
						<Button onClick={onCreate} disabled={user.role === OPERATOR}>
							{t("createWebRoute")}
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
			<RouteModal ref={modalRef} />
		</>
	);
};

export default Routes;

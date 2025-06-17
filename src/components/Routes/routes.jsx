import { Button } from "container/Button";
import { Input } from "container/Input";
import Loader from "container/Loader";
import { OPERATOR, isAdminRights } from "container/roleUtils";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvider, fetchRoutes } from "../../AppActions";
import { routerUrl } from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
import { routesValue } from "../../constants/common";
import VpcApiButton from "../VpcApiButton";
import RouteModal from "./routeModal";
import RoutesList from "./routesList";

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		dispatch(fetchRoutes());
		providerIdFetchStatus !== "fulfilled" && dispatch(fetchProvider());
	}, [dispatch, user]);

	const statuses = [routesFetchStatus, providerIdFetchStatus];

	const isError = statuses.includes("rejected");

	const isLoading = statuses.includes("pending");

	return (
		<>
			<h4>{t("routes")}</h4>
			{isError ? (
				""
			) : isLoading ? (
				<Loader />
			) : (
				<>
					<div className="vpcDescription">
						<div>
							<p style={{ fontWeight: "700" }}>{t("search")}</p>
							<Input
								// icon="search"
								// iconPosition="left"
								placeholder={t("searchField")}
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
					<RoutesList items={routes} search={search} />
				</>
			)}
			<RouteModal ref={modalRef} />
		</>
	);
};

export default Routes;

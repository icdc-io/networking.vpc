import { Tabs, TabsContent, TabsList, TabsTrigger } from "container/Tabs";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { networkPath, networksPath, routesPath } from "../constants/routes";
import NetworkDetails from "./Details/networkDetails";
import Networks from "./Networks/networks";
import RoutesPage from "./Routes/routes";

const RootComponent = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const networksRoute = networksPath();
	const routesRoute = routesPath();
	const currentRouteParts = location.pathname.split("/");
	const isRootBalancerPath =
		currentRouteParts.filter((route) => route).length < 3;
	const defaultRoute = currentRouteParts[3];
	const navigate = useNavigate();

	if (isRootBalancerPath) return <Navigate to={networksRoute} replace />;

	const menuItems = [
		{
			name: t("networks"),
			path: networksRoute,
			component: Networks,
		},
		{
			name: t("routes"),
			path: routesRoute,
			component: RoutesPage,
		},
	];

	return (
		<Tabs
			defaultValue={defaultRoute}
			onValueChange={(value) => navigate(value)}
		>
			<TabsList>
				{menuItems.map((item) => (
					<TabsTrigger key={item.path} value={item.path}>
						{item.name}
					</TabsTrigger>
				))}
			</TabsList>
			{menuItems.map((item) => (
				<TabsContent key={item.path} value={item.path}>
					<Segment attached="bottom">
						<Outlet />
					</Segment>
				</TabsContent>
			))}
		</Tabs>
	);
};

const NetworksOverview = () => {
	return (
		<div className="networking_vpc">
			<React.Suspense fallback={null}>
				<Routes>
					<Route path="/" Component={RootComponent}>
						<Route path={networksPath()} Component={Networks} />
						<Route path={networkPath()} Component={NetworkDetails} />
						<Route path={routesPath()} Component={RoutesPage} />
					</Route>
					<Route path="*" element={<Navigate to={networksPath()} replace />} />
				</Routes>
			</React.Suspense>
		</div>
	);
};

export default NetworksOverview;

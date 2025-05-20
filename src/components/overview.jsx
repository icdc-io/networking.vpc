import { Segment } from "container/Segment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "container/Tabs";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { networkPath, networksPath, routesPath } from "../constants/routes";
import NetworkDetails from "./Details/networkDetails";
import Networks from "./Networks/networks";
import RoutesPage from "./Routes/routes";

const menuItems = [
	{
		name: "networks",
		path: networksPath(),
		component: Networks,
	},
	{
		name: "routes",
		path: routesPath(),
		component: RoutesPage,
	},
];

const RootComponent = ({ children }) => {
	const { t } = useTranslation();
	const currentRouteParts = window.location.pathname.split("/");
	const defaultRoute =
		menuItems.find((item) => item.path === currentRouteParts[3])?.path ||
		menuItems[0].path;

	const navigate = useNavigate();

	const onChange = (value) => {
		navigate(value, {
			replace: true,
		});
	};

	return (
		<Tabs defaultValue={defaultRoute} onValueChange={onChange}>
			<TabsList>
				{menuItems.map((item) => (
					<TabsTrigger key={item.path} value={item.path}>
						{t(item.name)}
					</TabsTrigger>
				))}
			</TabsList>
			{menuItems.map((item) => (
				<TabsContent key={item.path} value={item.path}>
					<Segment>{children}</Segment>
				</TabsContent>
			))}
		</Tabs>
	);
};

const NetworksOverview = () => {
	return (
		<div className="networking_vpc">
			<React.Suspense fallback={null}>
				<RootComponent>
					<Routes>
						<Route index element={<Navigate to={networksPath()} replace />} />
						<Route path={networksPath()} Component={Networks} />
						<Route path={networkPath()} Component={NetworkDetails} />
						<Route path={routesPath()} Component={RoutesPage} />
						<Route
							path="*"
							element={<Navigate to={networksPath()} replace />}
						/>
					</Routes>
				</RootComponent>
			</React.Suspense>
		</div>
	);
};

export default NetworksOverview;

import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Loader, Segment } from "semantic-ui-react";
import { networkPath, networksPath, routesPath } from "../constants/routes";
import TabsLayout from "../general/tabsLayout";

const NetworkDetails = React.lazy(() => import("./Details/networkDetails"));
const Networks = React.lazy(() => import("./Networks/networks"));
const RoutesPage = React.lazy(() => import("./Routes/routes"));

const RootComponent = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isRootBalancerPath =
    location.pathname.split("/").filter((route) => route).length < 3;

  if (isRootBalancerPath) return <Navigate to={networksPath()} replace />;

  const menuItems = [
    {
      name: t("networks"),
      path: networksPath(),
      component: Networks,
    },
    {
      name: t("routes"),
      path: routesPath(),
      component: RoutesPage,
    },
  ];

  return (
    <>
      <TabsLayout menuItems={menuItems} />
      <Segment attached="bottom">
        <Outlet />
      </Segment>
    </>
  );
};

const NetworksOverview = () => {
  return (
    <div className="networking_vpc">
      <React.Suspense fallback={<Loader active inline="centered" />}>
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

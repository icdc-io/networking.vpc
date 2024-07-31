import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader, Segment } from "semantic-ui-react";
import TabsLayout from "../general/tabsLayout";
import { networksPath, networkPath, routesPath } from "../constants/routes";
import { useTranslation } from "react-i18next";

const NetworkDetails = React.lazy(() => import("./Details/networkDetails"));
const Networks = React.lazy(() => import("./Networks/networks"));
const RoutesPage = React.lazy(() => import("./Routes/routes"));

const NetworksOverview = () => {
  const { t } = useTranslation();
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
        <React.Suspense fallback={<Loader active inline="centered" />}>
          <Routes>
            <Route exact path={networksPath()} Component={Networks} />
            <Route exact path={networkPath()} Component={NetworkDetails} />
            <Route exact path={routesPath()} Component={RoutesPage} />
            <Route
              path="*"
              element={<Navigate to={menuItems[0].path} replace />}
            />
          </Routes>
        </React.Suspense>
      </Segment>
    </>
  );
};

export default NetworksOverview;

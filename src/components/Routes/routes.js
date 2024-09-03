import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Input, Loader } from "semantic-ui-react";
import { fetchProvider, fetchRoutes } from "../../AppActions";
import { routesValue } from "../../constants/common";
import RouteModal from "./routeModal";
import RoutesList from "./routesList";

const ApiButton = React.lazy(() => import("container/ApiButton"));

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
  const baseUrls = useSelector((state) => state.host.baseUrls);
  const routerId = useSelector((state) => state.VpcStore.routerId);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

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
        <Loader active inline="centered" />
      ) : (
        <>
          <div className="vpcDescription">
            <div>
              <p style={{ fontWeight: "700" }}>{t("search")}</p>
              <Input
                icon="search"
                iconPosition="left"
                placeholder={t("searchField")}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
            <div className="buttons-vpc">
              <ApiButton
                element="route"
                item={routesValue}
                user={user}
                providerId={routerId}
                locationUrl={baseUrls[user.location]}
              />
              <RouteModal />
            </div>
          </div>
          <RoutesList items={routes} search={search} />
        </>
      )}
    </>
  );
};

export default Routes;

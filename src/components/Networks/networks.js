import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Input, Loader } from "semantic-ui-react";
import { fetchNetworks, fetchProvider, fetchVMs } from "../../AppActions";
import { networkValue } from "../../constants/common";
import NetworkModal from "./networkModal";
import NetworksList from "./networksList";

const ErrorScreen = React.lazy(() => import("container/ErrorScreen"));
const ApiButton = React.lazy(() => import("container/ApiButton"));

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
  const baseUrls = useSelector((state) => state.host.baseUrls);
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
            <ApiButton
              element="network"
              item={networkValue}
              user={user}
              providerId={providerId}
              locationUrl={baseUrls[user.location]}
            />
            <NetworkModal />
          </div>
        </div>
        {isError ? (
          <ErrorScreen />
        ) : isLoading ? (
          <Loader active inline="centered" />
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

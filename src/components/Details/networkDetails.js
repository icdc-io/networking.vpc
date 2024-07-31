import React, { useEffect } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNetwork,
  fetchSecurityGroups,
  fetchSecurityGroup,
  fetchProvider,
} from "../../AppActions";
import NetworkDetailsContent from "./networkDetailsContent";
import ButtonBack from "../../general/buttonBack";
import { useTranslation } from "react-i18next";

const NetworkDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const network = useSelector((state) => state.VpcStore.network);
  const networkFetchStatus = useSelector(
    (state) => state.VpcStore.networkFetchStatus,
  );
  const group = useSelector((state) => state.VpcStore.group);
  // const groupFetchStatus = useSelector(
  //   (state) => state.VpcStore.groupFetchStatus,
  // );
  const providerId = useSelector((state) => state.VpcStore.providerId);
  const providerIdFetchStatus = useSelector(
    (state) => state.VpcStore.providerIdFetchStatus,
  );
  const user = useSelector((state) => state.host.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNetwork(id));
    dispatch(fetchSecurityGroups());
    dispatch(fetchSecurityGroup(id));
    providerIdFetchStatus !== "fulfilled" && dispatch(fetchProvider());
  }, [dispatch, id, user]);

  const statuses = [providerIdFetchStatus, networkFetchStatus];

  const isError = statuses.includes("rejected") || statuses.includes("");

  const isLoading = statuses.includes("pending");

  return (
    <>
      <Grid.Row className="content-page__header">
        <ButtonBack back={t("back")} style={{ marginLeft: 15 }} path={".."} />
      </Grid.Row>
      {isError ? (
        "Error"
      ) : isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <NetworkDetailsContent items={[network, group, providerId, user]} />
      )}
    </>
  );
};

export default NetworkDetails;

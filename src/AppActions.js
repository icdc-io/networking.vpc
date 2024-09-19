import { createData, fetchData } from "container/Api";
import { toast } from "sonner";
import * as ActionTypes from "./AppConstants";

const notificationOptions = { position: "top-right", hideAfter: 7 };

const errorHandler = (error) => {
  if (!error) return "";

  if (error.includes("Could not find security_group with such id")) {
    return ActionTypes.notificationMessages[
      localStorage.getItem("icdc-lang") || "en"
    ].sgNotExist;
  }

  if (error.includes("Firewall rule edit error")) {
    return ActionTypes.notificationMessages[
      localStorage.getItem("icdc-lang") || "en"
    ].ruleEditError;
  }

  if (error.includes("Could not find network_router with such id")) {
    return ActionTypes.notificationMessages[
      localStorage.getItem("icdc-lang") || "en"
    ].routerNotExist;
  }

  if (error.includes("401")) {
    return ActionTypes.notificationMessages[
      localStorage.getItem("icdc-lang") || "en"
    ].unauthorized;
  }

  if (error.includes("Rule already exists")) {
    return ActionTypes.notificationMessages[
      localStorage.getItem("icdc-lang") || "en"
    ].ruleAlreadyExists;
  }

  if (error.includes(`Can't delete security group with assigned NICs`)) {
    return ActionTypes.notificationMessages[
      localStorage.getItem("icdc-lang") || "en"
    ].cannotDeleteGroupWithAssignedVmsNics;
  }

  return "";
};

const errorNotification = (error) => {
  const errorTypeCheck = error instanceof Object ? error.message : error;
  toast.error(
    ActionTypes.notificationMessages[localStorage.getItem("icdc-lang") || "en"]
      .error + errorHandler(errorTypeCheck),
    notificationOptions,
  );
};

const successNotification = (msg) =>
  toast.success(
    ActionTypes.notificationMessages[localStorage.getItem("icdc-lang") || "en"]
      .success + msg,
    notificationOptions,
  );

export const infoNotification = (msg) => toast.info(msg, notificationOptions);

const getFullPath = (url) => "/api/compute/v1" + url;

export const fetchNetworks = (options) => ({
  type: ActionTypes.NETWORKS_FETCH,
  payload: fetchData(getFullPath(ActionTypes.NETWORKS_FETCH_URL), options),
});

export const fetchVMs = (options) => ({
  type: ActionTypes.ASSIGNED_VMS_FETCH,
  payload: fetchData(getFullPath(ActionTypes.ASSIGNED_VMS), options),
});

export const fetchAllVMs = () => ({
  type: ActionTypes.VPC_ALL_VMS_FETCH,
  payload: fetchData(getFullPath(ActionTypes.ALL_VMS_URL)),
});

export const fetchNetwork = (id) => ({
  type: ActionTypes.NETWORK_FETCH,
  payload: fetchData(getFullPath(ActionTypes.currentNetwork(id))),
});

export const fetchProvider = () => ({
  type: ActionTypes.VPC_PROVIDER_ID_FETCH,
  payload: fetchData(getFullPath(ActionTypes.PROVIDER_ID_URL)),
});

export const createNetwork = (payload, id) => ({
  type: ActionTypes.NETWORK_CREATE,
  payload: createData(getFullPath(ActionTypes.networksUrl(id)), payload),
});

const addNetwork = (payload) => ({
  type: ActionTypes.NETWORK_TEMP_ADD,
  payload,
});

const removeNetwork = (payload) => ({
  type: ActionTypes.NETWORK_TEMP_REMOVE,
  payload,
});

export const removeTemporaryNetwork = (payload) => {
  return (dispatch) => dispatch(removeNetwork(payload));
};

export const addTemporaryNetwork = (payload) => {
  return (dispatch) => dispatch(addNetwork(payload));
};

export const createNetworkActionAndFetch = (payload, id) => {
  return (dispatch) => {
    const response = dispatch(createNetwork(payload, id));

    response.then(
      () => {
        dispatch(fetchNetworks());
        dispatch(fetchVMs());
        successNotification("");
      },
      (error) => {
        dispatch(removeNetwork(payload.name));
        errorNotification(error);
      },
    );
  };
};

export const editNetwork = (payload, providerId) => ({
  type: ActionTypes.NETWORK_EDIT,
  payload: createData(getFullPath(ActionTypes.networkUrl(providerId)), payload),
});

export const editNetworkActionAndFetch = (payload, providerId) => {
  return (dispatch) => {
    const response = dispatch(editNetwork(payload, providerId));

    response.then(
      () => {
        dispatch(fetchNetworks());
        successNotification("");
      },
      (error) => errorNotification(error),
    );
  };
};

export const deleteNetwork = (payload, providerId) => ({
  type: ActionTypes.NETWORK_DELETE,
  payload: createData(getFullPath(ActionTypes.networkUrl(providerId)), payload),
});

export const deleteNetworkActionAndFetch = (payload, providerId) => {
  return (dispatch) => {
    const response = dispatch(deleteNetwork(payload, providerId));

    response.then(
      () => {
        dispatch(fetchNetworks());
        successNotification("");
      },
      (error) => errorNotification(error),
    );
  };
};

export const fetchSecurityGroups = () => ({
  type: ActionTypes.VPC_SECURITY_GROUPS_FETCH,
  payload: fetchData(getFullPath(ActionTypes.SECURITY_GROUPS_FETCH_URL)),
});

export const fetchSecurityGroup = (id) => ({
  type: ActionTypes.VPC_SECURITY_GROUP_FETCH,
  payload: fetchData(getFullPath(ActionTypes.currentNetwork(id))),
});

export const deleteSecurityGroup = () => ({
  type: ActionTypes.VPC_SECURITY_GROUP_DELETE,
  payload: successNotification(""),
});

export const fetchRoutes = () => ({
  type: ActionTypes.VPC_ROUTES_FETCH,
  payload: fetchData(getFullPath(ActionTypes.ROUTES_FETCH_URL)),
});

export const createRoute = (payload, routerId) => ({
  type: ActionTypes.VPC_ROUTE_CREATE,
  payload: createData(getFullPath(ActionTypes.routerUrl(routerId)), payload),
});

export const createRouteActionAndFetch = (payload, routerId) => {
  return (dispatch) => {
    const response = dispatch(createRoute(payload, routerId));

    response.then(
      () => {
        dispatch(fetchRoutes());
        successNotification("");
      },
      (error) => errorNotification(error),
    );
  };
};

export const deleteRoute = (payload, routerId) => ({
  type: ActionTypes.VPC_ROUTE_DELETE,
  payload: createData(getFullPath(ActionTypes.routerUrl(routerId)), payload),
});

export const deleteRouteActionAndFetch = (payload, routerId) => {
  return (dispatch) => {
    const response = dispatch(deleteRoute(payload, routerId));

    response.then(
      () => {
        dispatch(fetchRoutes());
        successNotification("");
      },
      (error) => errorNotification(error),
    );
  };
};

export const unassignNicsToSecurityGroup = (payload, id) => ({
  type: ActionTypes.VPC_UNASSIGN_NICS_FROM_SECURITY_GROUP,
  payload: createData(getFullPath(ActionTypes.cloudSubnetsUrl(id)), payload),
});

export const unassignNicsFromSecurityGroupAndFetch = (payload, id) => {
  return (dispatch) => {
    infoNotification("Unassigning NICs...");
    const response = dispatch(unassignNicsToSecurityGroup(payload, id));

    response.then(
      () => {
        dispatch(fetchSecurityGroup(id));
        successNotification("");
      },
      (error) => {
        errorNotification(error);
      },
    );
  };
};

export const unassignNicsFromNetworkAndFetch = (payload, id) => {
  return (dispatch) => {
    infoNotification("Unassigning NICs...");
    const response = dispatch(unassignNicsToSecurityGroup(payload, id));

    response.then(
      () => {
        dispatch(fetchNetwork(id));
        successNotification("");
      },
      (error) => {
        errorNotification(error);
      },
    );
  };
};

export const assignNicsToSecurityGroup = (payload, id) => {
  return {
    type: ActionTypes.VPC_ASSIGN_NICS_TO_SECURITY_GROUP,
    payload: createData(getFullPath(ActionTypes.cloudSubnetsUrl(id)), payload),
  };
};

export const assignNicsToSecurityGroupAndFetch = (payload, id) => {
  return (dispatch) => {
    infoNotification("Assigning NICs...");
    const response = dispatch(assignNicsToSecurityGroup(payload, id));

    response.then(
      () => {
        dispatch(fetchSecurityGroup(id));
        successNotification("");
      },
      (error) => {
        errorNotification(error);
      },
    );
  };
};

export const assignNicsToNetworkAndFetch = (payload, id) => {
  return (dispatch) => {
    infoNotification("Assigning NICs...");
    const response = dispatch(assignNicsToSecurityGroup(payload, id));

    response.then(
      () => {
        dispatch(fetchNetwork(id));
        successNotification("");
      },
      (error) => {
        errorNotification(error);
      },
    );
  };
};

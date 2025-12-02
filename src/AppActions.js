import {
	createData,
	fetchData,
	showErrorNotification,
	showInfoNotification,
	showSuccessNotification,
} from "container/Api";
import * as ActionTypes from "./AppConstants";

const errorNotification = (error) => {
	showErrorNotification(error);
};

export const getFullPath = (url) => `/api/compute/v1${url}`;

export const fetchNetworks = (withoutLoader) => (dispatch) =>
	dispatch({
		// biome-ignore lint/performance/noDynamicNamespaceImportAccess: temporary fix
		type: ActionTypes[
			withoutLoader ? "NETWORKS_FETCH_NO_PENDING" : "NETWORKS_FETCH"
		],
		payload: fetchData(getFullPath(ActionTypes.NETWORKS_FETCH_URL), {
			"X-Miq-Group": "%ACCOUNT.%ROLE",
		}),
	});

export const fetchVMs = () => ({
	type: ActionTypes.ASSIGNED_VMS_FETCH,
	payload: fetchData(getFullPath(ActionTypes.ASSIGNED_VMS), {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const fetchAllVMs = () => ({
	type: ActionTypes.VPC_ALL_VMS_FETCH,
	payload: fetchData(getFullPath(ActionTypes.ALL_VMS_URL), {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const fetchNetwork = (id) => ({
	type: ActionTypes.NETWORK_FETCH,
	payload: fetchData(getFullPath(ActionTypes.currentNetwork(id)), {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const fetchProvider = () => ({
	type: ActionTypes.VPC_PROVIDER_ID_FETCH,
	payload: fetchData(getFullPath(ActionTypes.PROVIDER_ID_URL), {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const createNetwork = (payload, id) => ({
	type: ActionTypes.NETWORK_CREATE,
	payload: createData(getFullPath(ActionTypes.networksUrl(id)), payload, {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
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

		return response.then(
			() => {
				dispatch(fetchNetworks());
				dispatch(fetchVMs());
				showSuccessNotification("");
			},
			(error) => {
				// dispatch(removeNetwork(payload.name));
				errorNotification(error);
				throw new Error(error);
			},
		);
	};
};

export const editNetwork = (payload, providerId) => ({
	type: ActionTypes.NETWORK_EDIT,
	payload: createData(
		getFullPath(ActionTypes.networkUrl(providerId)),
		payload,
		{
			"X-Miq-Group": "%ACCOUNT.%ROLE",
		},
	),
});

export const editNetworkActionAndFetch = (payload, providerId) => {
	return (dispatch) => {
		const response = dispatch(editNetwork(payload, providerId));

		return response.then(
			() => {
				dispatch(fetchNetworks());
				showSuccessNotification("");
			},
			(error) => {
				errorNotification(error);
				throw new Error(error);
			},
		);
	};
};

export const deleteNetwork = (payload, providerId) => ({
	type: ActionTypes.NETWORK_DELETE,
	payload: createData(
		getFullPath(ActionTypes.networkUrl(providerId)),
		payload,
		{
			"X-Miq-Group": "%ACCOUNT.%ROLE",
		},
	),
});

export const deleteNetworkActionAndFetch = (payload, providerId) => {
	return (dispatch) => {
		const response = dispatch(deleteNetwork(payload, providerId));

		return response.then(
			() => {
				dispatch(fetchNetworks());
				showSuccessNotification("");
			},
			(error) => {
				errorNotification(error);
				throw new Error(error);
			},
		);
	};
};

export const fetchSecurityGroups = () => ({
	type: ActionTypes.VPC_SECURITY_GROUPS_FETCH,
	payload: fetchData(getFullPath(ActionTypes.SECURITY_GROUPS_FETCH_URL), {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const fetchSecurityGroup = (id) => ({
	type: ActionTypes.VPC_SECURITY_GROUP_FETCH,
	payload: fetchData(getFullPath(ActionTypes.currentNetwork(id)), {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const deleteSecurityGroup = () => ({
	type: ActionTypes.VPC_SECURITY_GROUP_DELETE,
	payload: showSuccessNotification(""),
});

export const fetchRoutes = () => ({
	type: ActionTypes.VPC_ROUTES_FETCH,
	payload: fetchData(getFullPath(ActionTypes.ROUTES_FETCH_URL), {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const createRoute = (payload, routerId) => ({
	type: ActionTypes.VPC_ROUTE_CREATE,
	payload: createData(getFullPath(ActionTypes.routerUrl(routerId)), payload, {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const createRouteActionAndFetch = (payload, routerId) => {
	return (dispatch) => {
		const response = dispatch(createRoute(payload, routerId));

		return response.then(
			() => {
				dispatch(fetchRoutes());
				showSuccessNotification("");
			},
			(error) => {
				errorNotification(error);
				throw new Error(error);
			},
		);
	};
};

export const deleteRoute = (payload, routerId) => ({
	type: ActionTypes.VPC_ROUTE_DELETE,
	payload: createData(getFullPath(ActionTypes.routerUrl(routerId)), payload, {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const deleteRouteActionAndFetch = (payload, routerId) => {
	return (dispatch) => {
		const response = dispatch(deleteRoute(payload, routerId));

		return response.then(
			() => {
				dispatch(fetchRoutes());
				showSuccessNotification("");
			},
			(error) => {
				errorNotification(error);
				throw new Error(error);
			},
		);
	};
};

export const unassignNicsToSecurityGroup = (payload, id) => ({
	type: ActionTypes.VPC_UNASSIGN_NICS_FROM_SECURITY_GROUP,
	payload: createData(getFullPath(ActionTypes.cloudSubnetsUrl(id)), payload, {
		"X-Miq-Group": "%ACCOUNT.%ROLE",
	}),
});

export const unassignNicsFromSecurityGroupAndFetch = (payload, id) => {
	return (dispatch) => {
		showInfoNotification("Unassigning NICs...");
		const response = dispatch(unassignNicsToSecurityGroup(payload, id));

		response.then(
			() => {
				dispatch(fetchSecurityGroup(id));
				showSuccessNotification("");
			},
			(error) => {
				errorNotification(error);
			},
		);
	};
};

export const unassignNicsFromNetworkAndFetch = (payload, id) => {
	return (dispatch) => {
		showInfoNotification("Unassigning NICs...");
		const response = dispatch(unassignNicsToSecurityGroup(payload, id));

		response.then(
			() => {
				dispatch(fetchNetwork(id));
				showSuccessNotification("");
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
		payload: createData(getFullPath(ActionTypes.cloudSubnetsUrl(id)), payload, {
			"X-Miq-Group": "%ACCOUNT.%ROLE",
		}),
	};
};

export const assignNicsToSecurityGroupAndFetch = (payload, id) => {
	return (dispatch) => {
		showInfoNotification("Assigning NICs...");
		const response = dispatch(assignNicsToSecurityGroup(payload, id));

		response.then(
			() => {
				dispatch(fetchSecurityGroup(id));
				showSuccessNotification("");
			},
			(error) => {
				errorNotification(error);
			},
		);
	};
};

export const assignNicsToNetworkAndFetch = (payload, id) => {
	return (dispatch) => {
		showInfoNotification("Assigning NICs...");
		const response = dispatch(assignNicsToSecurityGroup(payload, id));

		response.then(
			(data) => {
				dispatch(fetchNetwork(id));
				data.value.success
					? showSuccessNotification("")
					: errorNotification(data.value.message);
			},
			(error) => {
				errorNotification(error);
			},
		);
	};
};

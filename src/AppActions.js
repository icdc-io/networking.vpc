import * as ActionTypes from './AppConstants';
import API from './utilities/Api';
import cogoToast from 'cogo-toast';

const waitingForBaseUrl = async() => {
    const data = await window.insights.getUserInfo();
    const location = window.insights.getLocation();
    return data.external.locations[location];
};

const base = async(url) => await waitingForBaseUrl() + `/api/compute/v1` + url;

const notificationOptions = { position: 'top-right', hideAfter: 7 };

const errorHandler = (error) => {
    if (error.includes('Could not find security_group with such id')) {
        return ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].sgNotExist;
    }

    if (error.includes('Firewall rule edit error')) {
        return ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].ruleEditError;
    }

    if (error.includes('Could not find network_router with such id')) {
        return ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].routerNotExist;
    }

    if (error.includes('401')) {
        return ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].unauthorized;
    }

    if (error.includes('Rule already exists')) {
        return ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].ruleAlreadyExists;
    }

    if (error.includes(`Can't delete security group with assigned NICs`)) {
        return ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].cannotDeleteGroupWithAssignedVmsNics;
    }

    return '';
};

const errorNotification = (error) => {
    const errorTypeCheck = error instanceof Object ? error.message : error;
    cogoToast.error(ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].error +
        errorHandler(errorTypeCheck), notificationOptions);
};

const successNotification = (msg) =>
    cogoToast.success(ActionTypes.notificationMessages[localStorage.getItem('icdc-lang') || 'en'].success + msg, notificationOptions);

export const infoNotification = (msg) =>
    cogoToast.info(msg, notificationOptions);

const expandHeaders = (headers) => {
    const account = window.insights.getAccount();
    const role = window.insights.getRole();

    return {
        ...headers,
        Authorization: `Bearer ${window.insights.getToken()}`,
        X_MIQ_GROUP: `${account.toLowerCase()}.${role.toLowerCase()}`,
        'x-icdc-role': role,
        'x-icdc-account': account
    };
};

const fetchData = async (url, headers, payload) => {
    const response = await API.get(await base(url), expandHeaders(headers), payload);
    console.log(response)
    return response.data;
};

const createData = async (url, headers, payload) => {
    const response = await API.post(await base(url), expandHeaders(headers), payload);
    return response.data;
};

const updateData = async(url, headers, payload) => {
    const response = await API.put(await base(url), payload, expandHeaders(headers));
    return response.data;
};

const deleteData = async(url, headers) => {
    const response = await API.delete(await base(url), expandHeaders(headers));
    return response.data;
};

export const fetchNetworks = (options) => ({
    type: ActionTypes.NETWORKS_FETCH,
    payload: fetchData(ActionTypes.NETWORKS_FETCH_URL, {}, options)
});

export const fetchVMs = (options) => ({
    type: ActionTypes.ASSIGNED_VMS_FETCH,
    payload: fetchData(ActionTypes.ASSIGNED_VMS, {}, options)
});

export const fetchAllVMs = (options) => ({
    type: ActionTypes.ALL_VMS_FETCH,
    payload: fetchData(ActionTypes.ALL_VMS_URL, {}, options)
});

export const fetchNetwork = (id) => ({
    type: ActionTypes.NETWORK_FETCH,
    payload: fetchData(ActionTypes.currentNetwork(id), {}, {})
});

export const fetchProvider = () => ({
    type: ActionTypes.PROVIDER_ID_FETCH,
    payload: fetchData(ActionTypes.PROVIDER_ID_URL, {}, {})
});

export const createNetwork = (payload, id) => ({
    type: ActionTypes.NETWORK_CREATE,
    payload: createData(ActionTypes.networksUrl(id), {}, payload)
});

const addNetwork = (payload) => ({
    type: ActionTypes.NETWORK_TEMP_ADD,
    payload
});

const removeNetwork = (payload) => ({
    type: ActionTypes.NETWORK_TEMP_REMOVE,
    payload
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

        response.then(() => {
            dispatch(fetchNetworks());
            dispatch(fetchVMs());
            successNotification('');
        }, error => {
            dispatch(removeNetwork(payload.name));
            errorNotification(error);
        });
    };
};

export const editNetwork = (payload, providerId) => ({
    type: ActionTypes.NETWORK_EDIT,
    payload: createData(ActionTypes.networkUrl(providerId), {}, payload)
});

export const editNetworkActionAndFetch = (payload, providerId) => {
    return (dispatch) => {
        const response = dispatch(editNetwork(payload, providerId));

        response.then(() => {
            dispatch(fetchNetworks());
            successNotification('');
        }, error => errorNotification(error));
    };
};

export const deleteNetwork = (payload, providerId) => ({
    type: ActionTypes.NETWORK_DELETE,
    payload: createData(ActionTypes.networkUrl(providerId), {}, payload)
});

export const deleteNetworkActionAndFetch = (payload, providerId) => {
    return (dispatch) => {
        const response = dispatch(deleteNetwork(payload, providerId));

        response.then(() => {
            dispatch(fetchNetworks());
            successNotification('');
        }, error => errorNotification(error));
    };
};

export const fetchSecurityGroups = (options) => ({
    type: ActionTypes.SECURITY_GROUPS_FETCH,
    payload: fetchData(ActionTypes.SECURITY_GROUPS_FETCH_URL, {}, options)
});

export const fetchSecurityGroup = (id) => ({
    type: ActionTypes.SECURITY_GROUP_FETCH,
    payload: fetchData(ActionTypes.currentNetwork(id), {}, {})
});

export const deleteSecurityGroup = () => ({
    type: ActionTypes.SECURITY_GROUP_DELETE,
    payload: successNotification('')
});

export const fetchRoutes = (options) => ({
    type: ActionTypes.ROUTES_FETCH,
    payload: fetchData(ActionTypes.ROUTES_FETCH_URL, {}, options)
});

export const createRoute = (payload, routerId) => ({
    type: ActionTypes.ROUTE_CREATE,
    payload: createData(ActionTypes.routerUrl(routerId), {}, payload)
});

export const createRouteActionAndFetch = (payload, routerId) => {
    return (dispatch) => {
        const response = dispatch(createRoute(payload, routerId));

        response.then(() => {
            dispatch(fetchRoutes());
            successNotification('');
        }, error => errorNotification(error));
    };
};

export const deleteRoute = (payload, routerId) => ({
    type: ActionTypes.ROUTE_DELETE,
    payload: createData(ActionTypes.routerUrl(routerId), {}, payload)
});

export const deleteRouteActionAndFetch = (payload, routerId) => {
    return (dispatch) => {
        const response = dispatch(deleteRoute(payload, routerId));

        response.then(() => {
            dispatch(fetchRoutes());
            successNotification('');
        }, error => errorNotification(error));
    };
};

export const unassignNicsToSecurityGroup = (payload, id) => ({
    type: ActionTypes.UNASSIGN_NICS_FROM_SECURITY_GROUP,
    payload: createData(ActionTypes.securityGroupUrl(id), {}, payload)
});

export const assignNicsToSecurityGroup = (payload, id) => {
    return({
    type: ActionTypes.ASSIGN_NICS_TO_SECURITY_GROUP,
    payload: createData(ActionTypes.cloudSubnetsUrl(id), {}, payload)
})};

export const assignNicsToSecurityGroupAndFetch = (payload, id) => {
    return (dispatch) => {
        infoNotification('Assigning NICs...');
        const response = dispatch(assignNicsToSecurityGroup(payload, id));

        response.then(() => {
            dispatch(fetchSecurityGroup(id));
            successNotification('');
        }, error => {
            errorNotification(error);
        });
    };
};

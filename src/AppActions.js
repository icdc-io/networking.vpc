import * as ActionTypes from './AppConstants';
import API from './utilities/Api';
import cogoToast from 'cogo-toast';

const waitingForBaseUrl = () => {
    const { locations } = window.insights.getUserInfo().external;
    const location = window.insights.getLocation();
    return locations[location];
};

const base = (url) => waitingForBaseUrl() + `/api/compute/v1` + url;

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
    const response = await API.get(base(url), expandHeaders(headers), payload);
    return response.data;
};

const createData = async (url, headers, payload) => {
    const response = await API.post(base(url), expandHeaders(headers), payload);
    return response.data;
};

const updateData = async (url, headers, payload) => {
    const response = await API.put(base(url), payload, expandHeaders(headers));
    return response.data;
};

const deleteData = async (url, headers) => {
    const response = await API.delete(base(url), expandHeaders(headers));
    return response;
};

const fetchDataGroups = async (url, headers, payload) => {
    return await fetchData(url, headers, payload).then(response => response);
};

const fetchDataRoutes = async (url, headers, payload) => {
    return await fetchData(url, headers, payload)
        .then(response => ({
            routes: response.resources[0].extra_attributes.routes,
            routerId: response.resources[0].id
        }));
};

const fetchProviderId = async (url, headers, payload) => {
    return await fetchData(url, headers, payload).then(response => response.resources[0].id);
};

const fetchCurrentNetwork = async (url, headers, options) => {
    const response = await fetchData(url, headers, options);
    let networkData = {
        name: response.cloud_network.name,
        subnet: response.cidr,
        type: response.network_protocol,
        dns: response.dns_nameservers[0],
        assignedVms: response.assigned_vms,
        netId: response.cloud_network_id
    };

    return networkData;
};

const fetchVMsData = async (url, headers, options) => {
    const response = await fetchData(url, headers, options);
    let vmsArray = [];
    response.resources.forEach((item) => {
        vmsArray.push({
            subnetId: item.id,
            netId: item.cloud_network_id,
            vmsCount: item.assigned_vms.length
        });
    });

    return vmsArray;
};

const fetchCurrentSecurityGroup = async (url, headers, options) => {
    const response = await fetchData(url, headers, options);
    let securityGroup = {
        id: response.id,
        ems: response.ems_ref,
        name: response.name,
        firewallRules: response.firewall_rules,
        assignedVms: response.assigned_vms
    };

    return securityGroup;
};

const fetchNetworksData = async (url, headers, options) => {
    const response = await fetchData(url, headers, options);
    let networksArray = [];
    response.resources.forEach((item) => {
        networksArray.push({
            name: item.name,
            netId: item.id,
            emsRef: item.ems_ref
        });
        item.cloud_subnets.forEach((subnet) => {
            networksArray.push(Object.assign(networksArray.pop(), {
                id: subnet.id,
                subnet: subnet.cidr,
                type: subnet.network_protocol,
                dns: subnet.dns_nameservers[0]
            }));
        });
    });
    return networksArray;
};

export const fetchNetworks = (options) => ({
    type: ActionTypes.NETWORKS_FETCH,
    payload: fetchNetworksData(ActionTypes.NETWORKS_FETCH_URL, {}, options)
});

export const fetchVMs = (options) => ({
    type: ActionTypes.ASSIGNED_VMS_FETCH,
    payload: fetchVMsData(ActionTypes.ASSIGNED_VMS, {}, options)
});

export const fetchAllVMs = (options) => ({
    type: ActionTypes.ALL_VMS_FETCH,
    payload: fetchDataGroups(ActionTypes.ALL_VMS_URL, {}, options)
});

export const fetchNetwork = (id) => ({
    type: ActionTypes.NETWORK_FETCH,
    payload: fetchCurrentNetwork(ActionTypes.currentNetwork(id), {}, {})
});

export const fetchProvider = () => ({
    type: ActionTypes.PROVIDER_ID_FETCH,
    payload: fetchProviderId(ActionTypes.PROVIDER_ID_URL, {}, {})
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
            dispatch(removeTemporaryNetwork(payload.name));
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
    payload: fetchDataGroups(ActionTypes.SECURITY_GROUPS_FETCH_URL, {}, options)
});

export const fetchSecurityGroup = (id) => ({
    type: ActionTypes.SECURITY_GROUP_FETCH,
    payload: fetchCurrentSecurityGroup(ActionTypes.getSecurityGroup(id), {}, {})
});

export const deleteSecurityGroup = () => ({
    type: ActionTypes.SECURITY_GROUP_DELETE,
    payload: successNotification('')
});

export const fetchRoutes = (options) => ({
    type: ActionTypes.ROUTES_FETCH,
    payload: fetchDataRoutes(ActionTypes.ROUTES_FETCH_URL, {}, options)
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

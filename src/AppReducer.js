/* eslint camelcase: 0 */
import * as ActionTypes from './AppConstants';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    networks: [],
    networksFetchStatus: '',
    assignedVms: [],
    assignedVmsFetchStatus: '',
    unassignedVmsFetchStatus: '',
    network: {},
    networkFetchStatus: '',
    group: {},
    groupFetchStatus: '',
    routes: [],
    routesFetchStatus: '',
    route: {},
    routeFetchStatus: '',
    routerId: '',
    providerId: '',
    providerIdFetchStatus: '',
    allVms: [],
    allVmsFetchStatus: ''
});

const mapNetworksData = (payload) => {
    const result = [];
    payload.resources.forEach((item) => {
        const networkData = {
            name: item.name,
            netId: item.id,
            emsRef: item.ems_ref,
            fullName: item.name.split('_').slice(2).join('_')
        };
        item.cloud_subnets.forEach((subnet) => result.push({
                id: subnet.id,
                subnet: subnet.cidr,
                type: subnet.network_protocol,
                dns: subnet.dns_nameservers[0],
                ...networkData
        }));
    });

    return result;
};

export const VpcStore = (state = initialState, action) => {
    switch (action.type) {

    case `${ActionTypes.ASSIGNED_VMS_FETCH}_PENDING`:
        return state.set('assignedVmsFetchStatus', 'pending');
    case `${ActionTypes.ASSIGNED_VMS_FETCH}_REJECTED`:
        return state.set('assignedVmsFetchStatus', 'rejected');
    case `${ActionTypes.ASSIGNED_VMS_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            assignedVms: action.payload.resources.map((item) => ({
                subnetId: item.id,
                netId: item.cloud_network_id,
                vmsCount: item.assigned_vms.length
            })),
            assignedVmsFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.UNASSIGN_NICS_FROM_SECURITY_GROUP}_PENDING`:
        return state.set('unassignedVmsFetchStatus', 'pending');
    case `${ActionTypes.UNASSIGN_NICS_FROM_SECURITY_GROUP}_REJECTED`:
        return state.set('unassignedVmsFetchStatus', 'rejected');
    case `${ActionTypes.UNASSIGN_NICS_FROM_SECURITY_GROUP}_FULFILLED`:
        return state.set('unassignedVmsFetchStatus', 'fulfilled');

    case `${ActionTypes.NETWORKS_FETCH}_PENDING`:
        return state.set('networksFetchStatus', 'pending');
    case `${ActionTypes.NETWORKS_FETCH}_REJECTED`:
        return state.set('networksFetchStatus', 'rejected');
    case `${ActionTypes.NETWORKS_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            networks: mapNetworksData(action.payload),
            networksFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.NETWORK_FETCH}_PENDING`:
        return state.set('networkFetchStatus', 'pending');
    case `${ActionTypes.NETWORK_FETCH}_REJECTED`:
        return state.set('networkFetchStatus', 'rejected');
    case `${ActionTypes.NETWORK_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            network: {
                name: action.payload.cloud_network.name,
                subnet: action.payload.cidr,
                type: action.payload.network_protocol,
                dns: action.payload.dns_nameservers[0],
                assignedVms: action.payload.assigned_vms,
                netId: action.payload.cloud_network_id
            },
            networkFetchStatus: 'fulfilled'
        });

    case ActionTypes.NETWORK_TEMP_ADD:
        return state.set('networks', [action.payload, ...state.networks]);
    case ActionTypes.NETWORK_TEMP_REMOVE:
        // eslint-disable-next-line
        const index = state.networks.filter(network => network.isLoading).findIndex(network => network.name.endsWith('_' + action.payload))
        if (index > -1) {
            return state.set('networks', [...state.networks.slice(0, index), ...state.networks.slice(index + 1)]);
        }

        return state;

    case `${ActionTypes.SECURITY_GROUP_FETCH}_PENDING`:
        return state.set('groupFetchStatus', 'pending');
    case `${ActionTypes.SECURITY_GROUP_FETCH}_REJECTED`:
        return state.set('groupFetchStatus', 'rejected');
    case `${ActionTypes.SECURITY_GROUP_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            group: {
                id: action.payload.id,
                ems: action.payload.ems_ref,
                name: action.payload.name,
                firewallRules: action.payload.firewall_rules,
                assignedVms: action.payload.assigned_vms
            },
            groupFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.ROUTES_FETCH}_PENDING`:
        return state.set('routesFetchStatus', 'pending');
    case `${ActionTypes.ROUTES_FETCH}_REJECTED`:
        return state.set('routesFetchStatus', 'rejected');
    case `${ActionTypes.ROUTES_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            routes: action.payload.resources[0].extra_attributes.routes,
            routerId: action.payload.resources[0].id,
            routesFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.PROVIDER_ID_FETCH}_PENDING`:
        return state.set('providerIdFetchStatus', 'pending');
    case `${ActionTypes.PROVIDER_ID_FETCH}_REJECTED`:
        return state.set('providerIdFetchStatus', 'rejected');
    case `${ActionTypes.PROVIDER_ID_FETCH}_FULFILLED`:
        console.log('providerId')
        console.log(action.payload)
        console.log('providerId')
        return Immutable.merge(state, {
            providerId: action.payload.resources[0].id,
            providerIdFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.ALL_VMS_FETCH}_PENDING`:
        return state.set('allVmsFetchStatus', 'pending');
    case `${ActionTypes.ALL_VMS_FETCH}_REJECTED`:
        return state.set('allVmsFetchStatus', 'rejected');
    case `${ActionTypes.ALL_VMS_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            allVms: action.payload.resources,
            allVmsFetchStatus: 'fulfilled'
        });

    default:
        return state;
    }

};

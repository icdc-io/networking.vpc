/* eslint camelcase: 0 */
import * as ActionTypes from './AppConstants';
import Immutable from 'seamless-immutable';

// eslint-disable-next-line new-cap
const initialState = Immutable({
    networks: [],
    networksFetchStatus: '',
    assignedVms: [],
    assignedVmsFetchStatus: '',
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
    allVms: [],
    allVmsFetchStatus: ''
});

export const VpcStore = (state = initialState, action) => {
    switch (action.type) {

    case `${ActionTypes.ASSIGNED_VMS_FETCH}_PENDING`:
        return state.set('assignedVmsFetchStatus', 'pending');
    case `${ActionTypes.ASSIGNED_VMS_FETCH}_REJECTED`:
        return state.set('assignedVmsFetchStatus', 'rejected');
    case `${ActionTypes.ASSIGNED_VMS_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            assignedVms: action.payload,
            assignedVmsFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.NETWORKS_FETCH}_PENDING`:
        return state.set('networksFetchStatus', 'pending');
    case `${ActionTypes.NETWORKS_FETCH}_REJECTED`:
        return state.set('networksFetchStatus', 'rejected');
    case `${ActionTypes.NETWORKS_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            networks: action.payload,
            networksFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.NETWORK_FETCH}_PENDING`:
        return state.set('networkFetchStatus', 'pending');
    case `${ActionTypes.NETWORK_FETCH}_REJECTED`:
        return state.set('networkFetchStatus', 'rejected');
    case `${ActionTypes.NETWORK_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            network: action.payload,
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
        return state.set('groupsetchStatus', 'rejected');
    case `${ActionTypes.SECURITY_GROUP_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            group: action.payload,
            groupFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.ROUTES_FETCH}_PENDING`:
        return state.set('routesFetchStatus', 'pending');
    case `${ActionTypes.ROUTES_FETCH}_REJECTED`:
        return state.set('routesFetchStatus', 'rejected');
    case `${ActionTypes.ROUTES_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            routes: action.payload.routes,
            routerId: action.payload.routerId,
            routesFetchStatus: 'fulfilled'
        });

    case `${ActionTypes.PROVIDER_ID_FETCH}_FULFILLED`:
        return Immutable.merge(state, {
            providerId: action.payload
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

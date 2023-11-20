export const NETWORKS_FETCH = 'NETWORKS_FETCH';
export const NETWORKS_FETCH_URL = `/cloud_networks?expand=resources&attributes=cloud_subnets,custom_attributes`;
export const NETWORK_FETCH = 'NETWORK_FETCH';
export const NETWORK_DELETE = 'NETWORK_DELETE';
export const NETWORK_CREATE = 'NETWORK_CREATE';
export const NETWORK_EDIT = 'NETWORK_EDIT';
export const ASSIGNED_VMS_FETCH = 'ASSIGNED_VMS_FETCH';
export const NETWORK_TEMP_ADD = 'NETWORK_TEMP_ADD';
export const NETWORK_TEMP_REMOVE = 'NETWORK_TEMP_REMOVE';
export const ASSIGN_NICS_TO_SECURITY_GROUP = 'ASSIGN_NICS_TO_SECURITY_GROUP';

export const ASSIGNED_VMS = `/cloud_subnets?expand=resources&attributes=assigned_vms`;
export const ALL_VMS_FETCH = 'ALL_VMS_FETCH';
export const ALL_VMS_URL = `/services?expand=resources&filter[]=retirement_state=nil&attributes=networks,user.email`;
export const PROVIDER_ID_FETCH = 'PROVIDER_ID_FETCH';
export const PROVIDER_ID_URL = `/providers?expand=resources&filter[]=type=ManageIQ::Providers::Redhat::NetworkManager`;

export const ROUTES_FETCH = 'ROUTES_FETCH';
export const ROUTES_FETCH_URL = `/network_routers?expand=resources`;
export const ROUTE_DELETE = 'ROUTE_DELETE';
export const ROUTE_CREATE = 'ROUTE_CREATE';

export const SECURITY_GROUPS_FETCH = 'SECURITY_GROUPS_FETCH';
export const SECURITY_GROUPS_FETCH_URL = `/security_groups?expand=resources&attributes=firewall_rules,assigned_vms`;
export const SECURITY_GROUP_FETCH = 'SECURITY_GROUP_FETCH';
export const SECURITY_GROUP_DELETE = 'SECURITY_GROUP_DELETE';
export const SECURITY_GROUP_LOADER = 'SECURITY_GROUP_LOADER';
export const UNASSIGN_NICS_FROM_SECURITY_GROUP = 'UNASSIGN_NICS_FROM_SECURITY_GROUP';
export const CLOUD_SUBNETS_FETCH = 'SECURITY_GROUPS_FETCH';

export const cloudSubnetsUrl = (id) => `/cloud_subnets/${id}`;
export const getSecurityGroup = (id) => `/security_groups/${id}?expand=resources&attributes=firewall_rules,assigned_vms`;
export const routerUrl = (id) => `/network_routers/${id}`;
export const securityGroupsUrl = (id) => `/providers/${id}/security_groups`;
export const securityGroupUrl = (id) => `/security_groups/${id}`;
export const ruleUrl = (id) => `/security_groups/${id}`;
export const currentNetwork = (id) => `/cloud_subnets/${id}?expand=resources&attributes=assigned_vms,network_ports,cloud_network.name,cloud_network.custom_attributes`;
export const networksUrl = (id) => `/providers/${id}/cloud_networks/`;
export const networkUrl = (providerId) => `/providers/${providerId}/cloud_networks`;

export const notificationMessages = {
    ru: {
        error: 'Ошибка! ',
        success: 'Успешно! ',
        sgNotExist: 'Группы безопасности с таким ID не существует',
        ruleEditError: 'Ошибка при редактировании правила',
        routerNotExist: 'Сетевого маршрутизатора с таким ID не существует',
        unauthorized: 'Пользователь не авторизирован',
        cannotDeleteGroupWithAssignedVmsNics: `Невозможно удалить группу безопасности с назначенными NICs`,
        ruleAlreadyExists: 'Правило уже существует'
    },
    en: {
        error: 'Error! ',
        success: 'Success! ',
        sgNotExist: 'Could not find Security group with such ID',
        ruleEditError: 'Firewall rule edit error',
        routerNotExist: 'Could not find Network router with such ID',
        unauthorized: 'Unauthorized',
        cannotDeleteGroupWithAssignedVmsNics: `Can't delete security group with assigned NICs`,
        ruleAlreadyExists: 'Rule already exists'
    }
};

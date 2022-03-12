export const rootPath = (menuGroup = ':menuGroup') => `/${menuGroup}/networks`;

export const groupsPath = (menuGroup = ':menuGroup') => `/${menuGroup}/groups`;
export const groupPath = (id = ':id', menuGroup = ':menuGroup') => `/${menuGroup}/groups/${id}`;

export const networksPath = (menuGroup = ':menuGroup') => `/${menuGroup}/networks`;
export const networkPath = (id = ':id', menuGroup = ':menuGroup') => `/${menuGroup}/networks/${id}`;
export const routesPath = (menuGroup = ':menuGroup') => `/${menuGroup}/routes`;

export const webRoutesPath = (menuGroup = ':menuGroup') => `/${menuGroup}/web_routes`;
export const detailsPath = (menuGroup = ':menuGroup', id = ':id') => `/${menuGroup}/web_routes/${id}`;
export const createroutePath = (menuGroup = ':menuGroup') => `/${menuGroup}/web_routes/create`;
export const editroutePath = (menuGroup = ':menuGroup', id = ':id') => `/${menuGroup}/web_routes/edit/${id}`;

export const certificatesPath = (menuGroup = ':menuGroup') => `/${menuGroup}/certificates`;
export const createCertificatePath = (menuGroup = ':menuGroup') => `/${menuGroup}/certificates/create`;
export const editCertificatePath = (menuGroup = ':menuGroup', id = ':id') => `/${menuGroup}/certificates/edit/${id}`;
export const certificateDetailsPath = (menuGroup = ':menuGroup', id = ':id') => `/${menuGroup}/certificates/${id}`;

export const domainsPath = (menuGroup = ':menuGroup') => `/${menuGroup}/domains`;
export const domainPath = (zoneName = ':zoneName', menuGroup = ':menuGroup') => `/${menuGroup}/domains/${zoneName}/`;

export const vpnGatewaysPath = () => '/vpn/gateways';
export const vpnGatewayPath = (id = ':id') => `/vpn/gateways/${id}`;
export const vpnClientConnectionDevicesPath = (connectionId = ':connectionId') => `/vpn/connections/${connectionId}/devices`;
export const basePath = (menuGroup = ':menuGroup') => `/${menuGroup}`;

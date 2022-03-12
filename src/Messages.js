/* eslint-disable max-len */
import { defineMessages } from 'react-intl';

export default defineMessages({
    createS3user: {
        id: 'createS3user',
        description: 'Used as a title',
        defaultMessage: 'Create New S3 User'
    },
    submit: {
        id: 'submit',
        description: 'Submit Button',
        defaultMessage: 'Submit'
    },
    confirm: {
        id: 'confirm',
        description: 'Confirm Button',
        defaultMessage: 'Confirm'
    },
    delete: {
        id: 'delete',
        description: 'Delete Button',
        defaultMessage: 'Delete'
    },
    cancel: {
        id: 'cancel',
        description: 'Cancel Button',
        defaultMessage: 'Cancel'
    },
    search: {
        id: 'search',
        description: '',
        defaultMessage: 'Search by keyword...'
    },
    assignNic: {
        id: 'assignNic',
        description: '',
        defaultMessage: 'Assign NIC'
    },
    assignedVm: {
        id: 'assignedVm',
        description: '',
        defaultMessage: 'Assigned VM Network Interfaces'
    },
    assignedVmNics: {
        id: 'assignedVmNics',
        description: '',
        defaultMessage: 'Assigned VM NICs'
    },
    noAssignedVM: {
        id: 'noAssignedVM',
        description: '',
        defaultMessage: 'No assigned VM network interfaces'
    },
    data: {
        id: 'data',
        defaultMessage: 'Data'
    },
    selected: {
        id: 'selected',
        defaultMessage: '{ count } selected'
    },
    assigningNic: {
        id: 'assigningNic',
        defaultMessage: 'Assigning NICs...'
    },
    ip: {
        id: 'ip',
        description: '',
        defaultMessage: 'IP'
    },
    dnsIp: {
        id: 'dnsIp',
        description: '',
        defaultMessage: 'DNS Server IP address'
    },
    service: {
        id: 'service',
        description: '',
        defaultMessage: 'Service'
    },
    vmName: {
        id: 'vmName',
        description: '',
        defaultMessage: 'VM Name'
    },
    nic: {
        id: 'nic',
        description: '',
        defaultMessage: 'NIC'
    },
    vmId: {
        id: 'vmId',
        description: '',
        defaultMessage: 'Id'
    },
    ipv4: {
        id: 'ipv4',
        description: '',
        defaultMessage: 'IPv4'
    },
    ipv6: {
        id: 'ipv6',
        description: '',
        defaultMessage: 'IPv6'
    },
    mac: {
        id: 'mac',
        description: '',
        defaultMessage: 'MAC'
    },
    save: {
        id: 'save',
        description: 'Save Button',
        defaultMessage: 'Save'
    },
    create: {
        id: 'create',
        description: 'Create',
        defaultMessage: 'Create'
    },
    title: {
        id: 'title',
        description: '',
        defaultMessage: 'Title'
    },
    createVps: {
        id: 'createVps',
        description: '',
        defaultMessage: 'Create VPC Network'
    },
    editVps: {
        id: 'editVps',
        description: '',
        defaultMessage: 'Edit Network'
    },
    deleteVps: {
        id: 'deleteVps',
        description: '',
        defaultMessage: 'Delete Network'
    },
    deleteVpsHeader: {
        id: 'deleteVpsHeader',
        description: '',
        defaultMessage: 'Delete VPC Network'
    },
    deleteVpsDesc: {
        id: 'deleteVpsDesc',
        description: '',
        defaultMessage: 'Deleting a VPC network is permanent. You will no longer be able to assign VM Network interfaces to this network.'
    },
    deleteVpsMessage: {
        id: 'deleteVpsMessage',
        description: '',
        defaultMessage: 'Are you sure you want to delete {name}?'
    },
    deleteVpsDetailsDesc: {
        id: 'deleteVpsDetailsDesc',
        description: '',
        defaultMessage: 'To delete a VPC network, you must dissociate all VM Network Interfaces from it first.'
    },
    back: {
        id: 'back',
        description: '',
        defaultMessage: 'Back'
    },
    netDetails: {
        id: 'netDetails',
        description: '',
        defaultMessage: 'Network Details'
    },
    name: {
        id: 'name',
        description: '',
        defaultMessage: 'Name'
    },
    description: {
        id: 'description',
        description: '',
        defaultMessage: 'Description'
    },
    space: {
        id: 'space',
        description: '',
        defaultMessage: 'Space'
    },
    buckets: {
        id: 'buckets',
        description: '',
        defaultMessage: 'Buckets'
    },
    objects: {
        id: 'objects',
        description: '',
        defaultMessage: 'Objects'
    },
    networks: {
        id: 'networks',
        description: '',
        defaultMessage: 'Networks'
    },
    noNetworks: {
        id: 'noNetworks',
        description: '',
        defaultMessage: 'No networks'
    },
    noRoutes: {
        id: 'noRoutes',
        description: '',
        defaultMessage: 'No routes'
    },
    securityGroup: {
        id: 'securityGroup',
        description: '',
        defaultMessage: 'Security Group'
    },
    securityGroups: {
        id: 'securityGroups',
        description: '',
        defaultMessage: 'Security Groups'
    },
    vpcNetworks: {
        id: 'vpcNetworks',
        description: '',
        defaultMessage: 'VPC Networks'
    },
    noSecurityGroups: {
        id: 'noSecurityGroups',
        description: '',
        defaultMessage: 'No Security Groups'
    },
    firewall: {
        id: 'firewall',
        description: '',
        defaultMessage: 'Firewall'
    },
    firewallRulesDescription: {
        id: 'firewallRulesDescription',
        defaultMessage: 'If you do not specify a remote security group or remote IP subnet, then the access to your service will be open from any IP address {tag} (0.0.0.0/0) and any security group. In other words, if your service has a public IP address, then this can lead to your service being {tag} accessible for everyone over the Internet.'
    },
    deleteSecurityGroup: {
        id: 'deleteSecurityGroup',
        description: '',
        defaultMessage: 'Delete Group'
    },
    notApplicable: {
        id: 'notApplicable',
        defaultMessage: 'N/A'
    },
    deleteSecurityGroupHeader: {
        id: 'deleteSecurityGroupHeader',
        description: '',
        defaultMessage: 'Delete Security Group'
    },
    deleteSecurityGroupDesc: {
        id: 'deleteSecurityGroupDesc',
        defaultMessage: 'Be careful as you may lose network access to your virtual machines.'
    },
    routes: {
        id: 'routes',
        description: '',
        defaultMessage: 'Routes'
    },
    deleteRoute: {
        id: 'deleteRoute',
        description: '',
        defaultMessage: 'Delete Route'
    },
    deleteRouteHeader: {
        id: 'deleteRouteHeader',
        description: '',
        defaultMessage: 'Delete Route'
    },
    deleteRouteMessage: {
        id: 'deleteRouteMessage',
        description: '',
        defaultMessage: 'Are you sure you want to delete this route?'
    },
    editRoute: {
        id: 'editRoute',
        description: '',
        defaultMessage: 'Edit route'
    },
    createRoute: {
        id: 'createRoute',
        description: '',
        defaultMessage: 'Create route'
    },
    type: {
        id: 'type',
        description: '',
        defaultMessage: 'Type'
    },
    subnet: {
        id: 'subnet',
        description: '',
        defaultMessage: 'Subnet'
    },
    gateway: {
        id: 'gateway',
        description: '',
        defaultMessage: 'Gateway'
    },
    required: {
        id: 'required',
        description: '',
        defaultMessage: 'Required'
    },
    rules: {
        id: 'rules',
        description: '',
        defaultMessage: 'Rules'
    },
    editSecurityGroup: {
        id: 'editSecurityGroup',
        description: '',
        defaultMessage: 'Edit Security Group'
    },
    editNetwork: {
        id: 'editNetwork',
        description: '',
        defaultMessage: 'Edit network'
    },
    createSecurityGroup: {
        id: 'createSecurityGroup',
        description: '',
        defaultMessage: 'Create Security Group'
    },
    nameSecurityGroups: {
        id: 'nameSecurityGroups',
        description: '',
        defaultMessage: 'Security Group name'
    },
    wrong: {
        id: 'wrong',
        description: '',
        defaultMessage: 'Something went wrong'
    },
    errorNotification: {
        id: 'errorNotification',
        description: '',
        defaultMessage: 'Error! '
    },
    successNotification: {
        id: 'successNotification',
        description: '',
        defaultMessage: 'Success! '
    },
    maxLength: {
        id: 'maxLength',
        description: '',
        defaultMessage: 'Must be ${max} characters or less'
    },
    minLength: {
        id: 'minLength',
        description: '',
        defaultMessage: 'Must be ${min} characters or more'
    },
    numberValidation: {
        id: 'numberValidation',
        description: '',
        defaultMessage: 'Must be a number'
    },
    traffic: {
        id: 'traffic',
        description: '',
        defaultMessage: 'Traffic'
    },
    ipType: {
        id: 'ipType',
        defaultMessage: 'IP Type'
    },
    portRange: {
        id: 'portRange',
        description: '',
        defaultMessage: 'Port range'
    },
    protocol: {
        id: 'protocol',
        description: '',
        defaultMessage: 'Protocol'
    },
    remoteSecurityGroup: {
        id: 'remoteSecurityGroup',
        description: '',
        defaultMessage: 'Remote security group'
    },
    remoteIpSubnet: {
        id: 'remoteIpSubnet',
        description: '',
        defaultMessage: 'Remote IP Subnet'
    },
    inbound: {
        id: 'inbound',
        description: '',
        defaultMessage: 'Inbound'
    },
    outbound: {
        id: 'outbound',
        description: '',
        defaultMessage: 'Outbound'
    },
    addRule: {
        id: 'addRule',
        description: '',
        defaultMessage: 'Add Rule'
    },
    deleteRule: {
        id: 'deleteRule',
        description: '',
        defaultMessage: 'Delete Rule'
    },
    noFirewallRules: {
        id: 'noFirewallRules',
        defaultMessage: 'Rules list is empty.'
    },
    assignedNics: {
        id: 'assignedNics',
        description: '',
        defaultMessage: 'Assigned VM NICs'
    },
    viewVmNics: {
        id: 'viewVmNics',
        description: '',
        defaultMessage: 'View VM NICs'
    },
    addSubnet: {
        id: 'addSubnet',
        description: '',
        defaultMessage: 'Add subnet'
    },
    any: {
        id: 'any',
        description: '',
        defaultMessage: 'Any{value}'
    },
    Any: {
        id: 'Any',
        description: '',
        defineMessages: 'Any{value}'
    },
    sameRule: {
        id: 'sameRule',
        description: '',
        defaultMessage: 'The same rule is already exists'
    },
    creatingNetwork: {
        id: 'creatingNetwork',
        description: '',
        defaultMessage: 'Creating the network...'
    },
    domains: {
        id: 'domains',
        description: '',
        defaultMessage: 'DNS Domains'
    },
    domainName: {
        id: 'domainName',
        description: '',
        defaultMessage: 'Domain Name'
    },
    domain: {
        id: 'domain',
        defaultMessage: 'Domain'
    },
    noDomains: {
        id: 'noDomains',
        description: '',
        defaultMessage: 'Domain list is empty. You can add a domain.'
    },
    addDomain: {
        id: 'addDomain',
        description: '',
        defaultMessage: 'Add Domain'
    },
    addADomain: {
        id: 'addADomain',
        description: '',
        defaultMessage: 'Add a Domain'
    },
    enterDomainName: {
        id: 'enterDomainName',
        defaultMessage: 'Enter Domain Name'
    },
    deleteDomain: {
        id: 'deleteDomain',
        description: '',
        defaultMessage: 'Delete DNS Domain'
    },
    deleteDomainWarningMessage: {
        id: 'deleteDomainWarningMessage',
        description: '',
        defaultMessage: 'Once "{name}" domain is deleted, all associated virtual machines will become unavailable by hostnames.'
    },
    createDnsRecord: {
        id: 'createDnsRecord',
        defaultMessage: 'Create a new DNS record'
    },
    deleteDnsZoneRecord: {
        id: 'deleteDnsZoneRecord',
        defaultMessage: 'Delete DNS Record'
    },
    deleteDnsZoneWarningMessage: {
        id: 'deleteDnsZoneWarningMessage',
        defaultMessage: 'This is irreversible. Your DNS Domain will be deleted, and all associated virtual machines will become unaccessible by hostnames'
    },
    text: {
        id: 'text',
        defaultMessage: 'Text'
    },
    priority: {
        id: 'priority',
        defaultMessage: 'Priority'
    },
    ttl: {
        id: 'ttl',
        defaultMessage: 'TTL (seconds)'
    },
    id: {
        id: 'id',
        defaultMessage: 'ID'
    },
    port: {
        id: 'port',
        defaultMessage: 'Port'
    },
    weight: {
        id: 'weight',
        defaultMessage: 'Weight'
    },
    targetHostname: {
        id: 'targetHostname',
        defaultMessage: 'Target Hostname'
    },
    mailServerHostnameOrIp: {
        id: 'mailServerHostnameOrIp',
        defaultMessage: 'Mail Server Hostname or IP'
    },
    hostname: {
        id: 'hostname',
        defaultMessage: 'Hostname'
    },
    add: {
        id: 'add',
        defaultMessage: 'Add'
    },
    dnsRecords: {
        id: 'dnsRecords',
        defaultMessage: 'DNS Records'
    },
    noDnsRecords: {
        id: 'noDnsRecords',
        defaultMessage: 'Record list is empty. You can add a record above.'
    },
    dnsDescA: {
        id: 'dnsDescA',
        defaultMessage: 'Enter a name to create a record in this domain or enter @ to use the domain name itself.{tag} "A" records are for IPv4 addresses only and tell a request where your domain should direct to.'
    },
    dnsDescAAAA: {
        id: 'dnsDescAAAA',
        defaultMessage: `Use @ to create the record at the domain or enter a name to create it.{tag} AAAA records are for IPv6 addresses only and tell a request where your
        domain should direct to.`
    },
    dnsDescTXT: {
        id: 'dnsDescTXT',
        defaultMessage: 'TXT records are used to associate a string of text with a name. These are primarily used for verification.'
    },
    dnsDescSRV: {
        id: 'dnsDescSRV',
        defaultMessage: 'SRV records specify the location (name and port number) of servers for specific services.{tag} You can use service records to direct certain types of traffic to particular servers.'
    },
    dnsDescMX: {
        id: 'dnsDescMX',
        defaultMessage: 'MX records specify the mail servers responsible for accepting emails on behalf of your domain,{tag} and priority value if your provider has a number of mail servers for contingency.'
    },
    dnsDescCNAME: {
        id: 'dnsDescCNAME',
        defaultMessage: 'CNAME records act as an alias by mapping a name to another name.'
    },
    dnsDescNS: {
        id: 'dnsDescNS',
        defaultMessage: 'NS records specify the servers which are providing DNS services for your domain.{tag} You can use these to create subzones if you need to direct part of your traffic to another DNS service.'
    },
    dnsFormNamePlaceholder: {
        id: 'dnsFormNamePlaceholder',
        defaultMessage: 'Enter @ or Name'
    },
    dnsFormOnlyNamePlaceholder: {
        id: 'dnsFormOnlyNamePlaceholder',
        defaultMessage: 'Enter Name'
    },
    dnsFormSrvNamePlaceholder: {
        id: 'dnsFormSrvNamePlaceholder',
        defaultMessage: 'e.g. _service._proto'
    },
    dnsFormTtlPlaceholder: {
        id: 'dnsFormTtlPlaceholder',
        defaultMessage: 'Enter TTL'
    },
    dnsFormTargetHostnamePlaceholder: {
        id: 'dnsFormTargetHostnamePlaceholder',
        defaultMessage: 'e.g. www or other.com'
    },
    dnsMailServerHostnameOrIpPlaceholder: {
        id: 'dnsMailServerHostnameOrIpPlaceholder',
        defaultMessage: 'IP/Hostname'
    },
    dnsFormHostnamePlaceholder: {
        id: 'dnsFormHostnamePlaceholder',
        defaultMessage: 'Enter Hostname'
    },
    dnsFormPriorityPlaceholder: {
        id: 'dnsFormPriorityPlaceholder',
        defaultMessage: 'e.g. 10'
    },
    dnsFormTextPlaceholder: {
        id: 'dnsFormTextPlaceholder',
        defaultMessage: 'Enter Text'
    },
    dnsFormIpPlaceholder: {
        id: 'dnsFormIpPlaceholder',
        defaultMessage: 'e.g. {ipType}'
    },
    webRoutes: {
        id: 'webRoutes',
        defaultMessage: 'Web Routes'
    },
    noWebRoutes: {
        id: 'noWebRoutes',
        defaultMessage: 'No Web Routes'
    },
    targetPort: {
        id: 'targetPort',
        defaultMessage: 'Target Port'
    },
    tlsTermination: {
        id: 'tlsTermination',
        defaultMessage: 'TLS Termination'
    },
    viewWebRoute: {
        id: 'viewWebRoute',
        defaultMessage: 'View Details'
    },
    traefikUniqName: {
        id: 'traefikUniqName',
        defaultMessage: 'A unique name for the route within the project'
    },
    traefikPublHostname: {
        id: 'traefikPublHostname',
        defaultMessage: 'Public hostname for the route.'
    },
    traefikPath: {
        id: 'traefikPath',
        defaultMessage: 'Path that the router watches to route traffic to the service.'
    },
    traefikServiceRoute: {
        id: 'traefikServiceRoute',
        defaultMessage: 'Service to route to.'
    },
    traefikTargetPortDescript: {
        id: 'traefikTargetPortDescript',
        defaultMessage: 'Target port for traffic.'
    },
    traefikSplitTrafficDescript: {
        id: 'traefikSplitTrafficDescript',
        defaultMessage: 'Routes can direct traffic to multiple services for A/B testing. Each service has a weight controlling how much traffic it gets.'
    },
    traefikSplitTraffic: {
        id: 'traefikSplitTraffic',
        defaultMessage: 'Split traffic across multiple services'
    },
    traefikSecRoute: {
        id: 'traefikSecRoute',
        defaultMessage: 'Secure route'
    },
    traefikSecRouteDescript: {
        id: 'traefikSecRouteDescript',
        defaultMessage: 'Routes can be secured using several TLS termination types for serving certificates.'
    },
    traefikInsTraffic: {
        id: 'traefikInsTraffic',
        defaultMessage: 'Insecure Traffic'
    },
    traefikInsTrafficDescript: {
        id: 'traefikInsTrafficDescript',
        defaultMessage: 'Policy for traffic on insecure schemes like HTTP.'
    },
    traefikTlsCertificate: {
        id: 'traefikTlsCertificate',
        defaultMessage: 'TLS Certificate'
    },
    traefikTargetServices: {
        id: 'traefikTargetServices',
        defaultMessage: 'Target Services'
    },
    security: {
        id: 'security',
        defaultMessage: 'Security'
    },
    learnMore: {
        id: 'learnMore',
        defaultMessage: 'Learn more'
    },
    path: {
        id: 'path',
        defaultMessage: 'Path'
    },
    edit: {
        id: 'edit',
        defaultMessage: 'Edit'
    },
    certificates: {
        id: 'certificates',
        defaultMessage: 'Certificates'
    },
    noCertificates: {
        id: 'noCertificates',
        defaultMessage: 'No certificates'
    },
    createCertificate: {
        id: 'createCertificate',
        defaultMessage: 'Create Certificate'
    },
    certificate: {
        id: 'certificate',
        defaultMessage: 'Certificate'
    },
    certificateDescript: {
        id: 'certificateDescript',
        defaultMessage: 'TLS certificates for edge and re-encrypt termination. If not specified, the router’s default certificate is used.'
    },
    certificateUpDescript: {
        id: 'certificateUpDescript',
        defaultMessage: 'The PEM format certificate. Upload file by dragging & dropping, selecting it, or pasting from the clipboard.'
    },
    certificateKeyDescript: {
        id: 'certificateKeyDescript',
        defaultMessage: 'The PEM format key. Upload file by dragging & dropping, selecting it, or pasting from the clipboard.'
    },
    certificateCaDescript: {
        id: 'certificateCaDescript',
        defaultMessage: 'The PEM format CA certificate chain. Upload file by dragging & dropping, selecting it, or pasting from the clipboard.'
    },
    certificateDestDescript: {
        id: 'certificateDestDescript',
        defaultMessage: 'The PEM format CA certificate chain to validate the endpoint certificate for re-encrypt termination. Upload file by dragging & dropping, selecting it, or pasting from the clipboard.'
    },
    privateKey: {
        id: 'privateKey',
        defaultMessage: 'Private Key'
    },
    browse: {
        id: 'browse',
        defaultMessage: 'Browse...'
    },
    mockKey: {
        id: 'mock',
        defaultMessage: 'MIIGIDCCBAigAwIBAgIUMzFmSJ1zWSys9mqGaK8yjOpXffcwDQYJKoZIhvcNAQEL\\nBQAwgZYxCzAJBgNVBAYTAlJCMQ4wDAYDVQQIDAVNaW5zazEOMAwGA1UEBwwFTWlu\\nc2sxHDAaBgNVBAoME0RlZmF1bHQgQ29tcGFAgBgNVMAVNaW5zazEOMAwGA1UEBwwFTWlu\nc2sxHDAaBgNVBAoME0RlZmF1bHQgQ29tcGFAgBgNVMAVNaW5zazEOMAwGA1UEBwwFTWlu\nc2sxHDAaBgNVBAoME0RlZmF1bHQgQ29tcGFAgBgNVME0RlZmF1bHQgQ29tcGFAgBgNME0RlZmF1bHQgQ29tcGFAgBgNME0RlZmF1bHQgQ29tcGFAgBgNawsrfww'
    },
    key: {
        id: 'key',
        defaultMessage: 'Key'
    },
    caCertificate: {
        id: 'caCertificate',
        defaultMessage: 'CA Certificate'
    },
    caCertificateDes: {
        id: 'caCertificateDes',
        defaultMessage: 'Destination CA Certificate'
    },
    editCertificate: {
        id: 'editCertificate',
        defaultMessage: 'Edit Certificate'
    },
    cancelChanges: {
        id: 'cancelChanges',
        defaultMessage: 'Cancel Changes?'
    },
    sureCancelChanges: {
        id: 'sureCancelChanges',
        defaultMessage: 'Are you sure you want to leave without saving changes?'
    },
    dismiss: {
        id: 'dismiss',
        defaultMessage: 'Dismiss'
    },
    yesCancel: {
        id: 'yesCancel',
        defaultMessage: 'Yes, cancel'
    },
    destinationCertificate: {
        id: 'destinationCertificate',
        defaultMessage: 'Destination CA Certificate'
    },
    details: {
        id: 'details',
        defaultMessage: 'Details'
    },
    none: {
        id: 'none',
        defaultMessage: 'None'
    },
    tlcSetting: {
        id: 'tlcSetting',
        defaultMessage: 'TLS Settings'
    },
    deleteCertificate: {
        id: 'deleteCertificate',
        defaultMessage: 'Are you sure you want to delete the {name} certificate?'
    },
    deleteCertificateHead: {
        id: 'deleteCertificateHead',
        defaultMessage: 'Delete Certificate?'
    },
    deleteWebRoute: {
        id: 'deleteWebRoute',
        defaultMessage: 'Are you sure you want to delete the {name} route?'
    },
    cannotBeUndone: {
        id: 'cannotBeUndone',
        defaultMessage: 'This action cannot be undone.'
    },
    copied: {
        id: 'copied',
        defaultMessage: 'Copied!'
    },
    searchField: {
        id: 'searchField',
        defaultMessage: 'Search...'
    },
    altService: {
        id: 'altService',
        defaultMessage: 'Alternate service for route traffic'
    },
    weightDescript: {
        id: 'weightDescript',
        defaultMessage: 'Weight is a number between 1 and 100 that specifies the relative weight against other route services.'
    },
    deleteService: {
        id: 'deleteService',
        defaultMessage: 'Delete service'
    },
    anotherService: {
        id: 'anotherService',
        defaultMessage: 'Add Another Service'
    },
    optional: {
        id: 'optional',
        defaultMessage: '(optional)'
    },
    percTraffic: {
        id: 'percTraffic',
        defaultMessage: 'Percentage of traffic sent to each service. Drag the slider to adjust the values or '
    },
    editLink: {
        id: 'editLink',
        defaultMessage: 'edit weights as integers.'
    },
    threeYears: {
        id: 'threeYears',
        defaultMessage: 'created {time} ago'
    },
    exposedRoute: {
        id: 'exposedRoute',
        defaultMessage: 'Exposed on router "router" {time} ago'
    },
    tlsType: {
        id: 'tlsType',
        defaultMessage: 'Termination Type'
    },
    insecureTraffic: {
        id: 'insecureTraffic',
        defaultMessage: 'Insecure Traffic'
    },
    seconds: {
        id: 'seconds',
        defaultMessage: 'seconds'
    },
    minutes: {
        id: 'minutes',
        defaultMessage: 'minutes'
    },
    hours: {
        id: 'hours',
        defaultMessage: 'hours'
    },
    days: {
        id: 'days',
        defaultMessage: 'days'
    },
    month: {
        id: 'month',
        defaultMessage: 'month'
    },
    years: {
        id: 'years',
        defaultMessage: 'years'
    },
    tlsNotEnabled: {
        id: 'tlsNotEnabled',
        defaultMessage: 'TLS is not enabled. Edit this route to enable secure network traffic. There are no annotations on this resource.'
    },
    ipInterface: {
        id: 'ipInterface',
        defaultMessage: 'IP interface type'
    },
    general: {
        id: 'general',
        defaultMessage: 'General'
    },
    loadBalancer: {
        id: 'loadBalancer',
        defaultMessage: 'Load Balancer'
    },
    traefikDescriptionOne: {
        id: 'traefikDescriptionOne',
        defaultMessage: 'Application Load Balancer (ALB) allows to route web traffic or TLS traffic to Compute services based on hostname in HTTP protocol or Server Name Indication (SNI) extension of TLS protocol.'
    },
    traefikDescriptionTwo: {
        id: 'traefikDescriptionTwo',
        defaultMessage: 'First you have to configure DNS CNAME record pointing to ALB public hostname to allow internet traffic to get to ALB instance.'
    },
    publicHostname: {
        id: 'publicHostname',
        defaultMessage: 'Public hostname:'
    },
    vpnGateways: {
        id: 'vpnGateways',
        defaultMessage: 'VPN Gateways'
    },
    addVpnGateway: {
        id: 'addVpnGateway',
        defaultMessage: 'Add VPN Gateway'
    },
    publicKey: {
        id: 'publicKey',
        defaultMessage: 'Public Key'
    },
    publicHostnameVpn: {
        id: 'publicHostnameVpn',
        defaultMessage: 'Public Hostname'
    },
    natSubnet: {
        id: 'natSubnet',
        defaultMessage: 'NAT Subnet'
    },
    deleteGateway: {
        id: 'deleteGateway',
        defaultMessage: 'Delete VPN Gateway ?'
    },
    deleteGatewayWarningMessage: {
        id: 'deleteGatewayWarningMessage',
        defaultMessage: 'Are you sure you want to delete the {name} VPN Gateway? This action cannot be undone.'
    },
    noSearchResults: {
        id: 'noSearchResults',
        defaultMessage: 'No matching search results'
    },
    noVpnGateways: {
        id: 'noVpnGateways',
        defaultMessage: 'VPN Gateways list is empty'
    },
    cloudGatewayInstance: {
        id: 'cloudGatewayInstance',
        defaultMessage: 'Cloud Gateway Instance'
    },
    vpnDetails: {
        id: 'vpnDetails',
        defaultMessage: 'VPN Details'
    },
    internalAddress: {
        id: 'internalAddress',
        defaultMessage: 'Internal Address'
    },
    clientConnections: {
        id: 'clientConnections',
        defaultMessage: 'Client Connections'
    },
    peerGateways: {
        id: 'peerGateways',
        defaultMessage: 'Peer Gateways'
    },
    natMapping: {
        id: 'natMapping',
        defaultMessage: 'NAT Mapping'
    },
    endpoint: {
        id: 'endpoint',
        defaultMessage: 'Endpoint'
    },
    peerEndpoint: {
        id: 'peerEndpoint',
        defaultMessage: 'Peer Endpoint'
    },
    routeSubnets: {
        id: 'routeSubnets',
        defaultMessage: 'Route Subnets'
    },
    vpnIp: {
        id: 'vpnIp',
        defaultMessage: 'VPN IP'
    },
    localIp: {
        id: 'localIp',
        defaultMessage: 'Local IP'
    },
    vpnDescription: {
        id: 'vpnDescription',
        defaultMessage: 'VPN Gateway is a type of virtual network gateway provided on the CloudGateway virtual machine managed by the platform.{tag}To obtain an additional VPN Gateway, you have to request a new CloudGateway instance from the support team by clicking the Support button.'
    },
    deleteClientConnection: {
        id: 'deleteClientConnection',
        defaultMessage: 'Delete Connection?'
    },
    deleteClientConnectionWarningMessage: {
        id: 'deleteClientConnectionWarningMessage',
        defaultMessage: 'Are you sure you want to delete the {name} client? This action cannot be undone.'
    },
    editClientConnection: {
        id: 'editClientConnection',
        defaultMessage: 'Edit Connection'
    },
    addClientConnection: {
        id: 'addClientConnection',
        defaultMessage: 'Add Connection'
    },
    addPeerGateway: {
        id: 'addPeerGateway',
        defaultMessage: 'Add Peer Gateway'
    },
    deleteNatMapping: {
        id: 'deleteNatMapping',
        defaultMessage: 'Delete NAT Mapping?'
    },
    deleteNatMappingWarningMessage: {
        id: 'deleteNatMappingWarningMessage',
        defaultMessage: 'Are you sure you want to delete the {name} NAT mapping? This action cannot be undone.'
    },
    addNatMapping: {
        id: 'addNatMapping',
        defaultMessage: 'Add NAT Mapping'
    },
    editNatMapping: {
        id: 'editNatMapping',
        defaultMessage: 'Edit NAT Mapping'
    },
    emptyListMessage: {
        id: 'emptyListMessage',
        defaultMessage: '{listName} list is empty.'
    },
    editPeerGateway: {
        id: 'editPeerGateway',
        defaultMessage: 'Edit Peer Gateway'
    },
    deletePeerGateway: {
        id: 'deletePeerGateway',
        defaultMessage: 'Delete Peer Gateway?'
    },
    deletePeerGatewayWarningMessage: {
        id: 'deletePeerGatewayWarningMessage',
        defaultMessage: 'Are you sure you want to delete the {name} peer gateway? This action cannot be undone.'
    },
    mtu: {
        id: 'mtu',
        defaultMessage: 'MTU'
    },
    creatingClientConnection: {
        id: 'creatingClientConnection',
        defaultMessage: 'Creating client connection...'
    },
    creatingPeerGateway: {
        id: 'creatingPeerGateway',
        defaultMessage: 'Creating peer gateway...'
    },
    creatingNatMapping: {
        id: 'creatingNatMapping',
        defaultMessage: 'Creating NAT mapping...'
    },
    ipWithSubnetPrefix: {
        id: 'ipWithSubnetPrefix',
        defaultMessage: 'IP with subnet prefix'
    },
    editGateway: {
        id: 'editGateway',
        defaultMessage: 'Edit VPN Gateway'
    },
    clientConnectionDetails: {
        id: 'clientConnectionDetails',
        defaultMessage: 'Client Connection Details'
    },
    devices: {
        id: 'devices',
        defaultMessage: 'Devices'
    },
    status: {
        id: 'status',
        defaultMessage: 'Status'
    },
    sent: {
        id: 'sent',
        defaultMessage: 'Sent'
    },
    received: {
        id: 'received',
        defaultMessage: 'Received'
    },
    lastConnection: {
        id: 'lastConnection',
        defaultMessage: 'Last Connection'
    },
    enabled: {
        id: 'enabled',
        defaultMessage: 'Enabled'
    },
    disabled: {
        id: 'disabled',
        defaultMessage: 'Disabled'
    },
    editDevice: {
        id: 'editDevice',
        defaultMessage: 'Edit Device'
    },
    deleteDevice: {
        id: 'deleteDevice',
        defaultMessage: 'Delete Device ?'
    },
    deleteDeviceWarningMessage: {
        id: 'deleteDeviceWarningMessage',
        defaultMessage: 'Are you sure you want to delete the {name} device? This action cannot be undone.'
    },
    enable: {
        id: 'enable',
        defaultMessage: 'Enable'
    },
    disable: {
        id: 'disable',
        defaultMessage: 'Disable'
    },
    addDevice: {
        id: 'addDevice',
        defaultMessage: 'Add Device'
    },
    creatingDevice: {
        id: 'creatingDevice',
        defaultMessage: 'Creating Device...'
    },
    keepAlive: {
        id: 'keepAlive',
        defaultMessage: 'KeepAlive'
    }
});

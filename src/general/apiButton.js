
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CodeSnippetOptions from '../components/ApiDialog/CodeSnippetOptions';
import CodeSnippet from '../components/ApiDialog/CodeSnippet';
import EscapeOutside from 'react-escape-outside';
import { fetchProvider } from '../AppActions';

const ApiButton = ({ direction, element, item, firewallGroup }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const providerId = useSelector(state => state.VpcStore.providerId);
    const user = useSelector(state => state.host.user);
    const baseUrl = `https://${user.location}/api/compute/v1`;
    const [activeItem, setActiveItem] = useState({
        action: 'TOKEN',
        tool: 'CURL'
    });

    useEffect(() => {
        dispatch(fetchProvider());
    }, [dispatch]);

    const returnPorts = ports => {
        let dashPosition = ports.indexOf('-');
        let minPort = ports.substring(0, dashPosition);
        let maxPort = ports.substring(dashPosition + 1);
        return {
            min: minPort,
            max: maxPort
        };
    };

    const networks = network => ({
        action: 'create',
        name: network.name
    });

    const subnet = network => ({
        subnet:
        {
            cidr: network.subnet,
            ip_version: 4,
            network_protocol: network.type,
            dns_nameservers: [network.dns],
            name: network.name + '_subnet'
        }
    });

    const groupsCreate = group => ({
        action: 'create',
        name: group.name
    });

    const groupsDelete = group => ({
        action: 'remove',
        name: group.name,
        id: group.id
    });

    const rulesForCreate = rule => ({
        action: 'add_firewall_rule',
        direction: rule.direction === 'outbound' ? 'egress' : 'ingress',
        port_range_min: returnPorts(rule.port).min,
        port_range_max: returnPorts(rule.port).max,
        protocol: rule.hostProtocol?.toLowerCase(),
        network_protocol: rule.ipType,
        remote_group_id: rule.groupRule,
        security_group_id: rule.groupEms,
        source_ip_range: rule.sourceIpRange
    });

    const rulesForDelete = rule => ({
        action: 'remove_firewall_rule',
        id: rule.ruleEmsRef
    });

    const routes = route => ({
        action: 'add_route',
        subnet: route.destination,
        gateway: route.nexthop
    });

    const vmCreate = vmInterface => ({
        action: 'add_to_port',
        nic_ids: [vmInterface.nicId]
    });

    const vmDelete = vmInterface => ({
        action: 'remove_from_port',
        nic_id: vmInterface.nicId
    });

    const data = (item, type) => {
        /*eslint-disable*/
        switch (element) {
            case 'network':
                return item.subnet ? JSON.stringify({ ...networks(item), ...subnet(item) }) : JSON.stringify(networks(item));
            case 'vmTable':
                return JSON.stringify(type === 'create' ? vmCreate(item) : vmDelete(item));
            case 'firewall':
                return JSON.stringify(type === 'create' ? groupsCreate(item) : groupsDelete(item));
            case 'rule':
                return JSON.stringify(type === 'create' ? rulesForCreate(item) : rulesForDelete(item));
            case 'route':
                return JSON.stringify(routes(item));
        }
        /*eslint-enable*/
    };

    const url = () => {
        /*eslint-disable*/
        switch (element) {
            case 'network':
                return `${baseUrl}/providers/${providerId}/cloud_networks/`;
            case 'allFirewalls':
                return `${baseUrl}/security_groups?expand=resources`;
            case 'firewall':
                return activeItem.action.toLowerCase() === 'get' ?
                    `${baseUrl}/security_groups/${item.id}?expand=resources\\&attributes=firewall_rules,assigned_vms` :
                    `${baseUrl}${activeItem.action.toLowerCase() === 'create' ? '/providers/' + providerId : ''}/security_groups`
            case 'rule':
                return `${baseUrl}/security_groups/${firewallGroup.id}${activeItem.action.toLowerCase() === 'get' ? '?expand=resources\\&attributes=firewall_rules' : ''}`;
            case 'vmTable':
                return `${baseUrl}/security_groups/${firewallGroup.id}`;
            case 'route':
                return `${baseUrl}/network_routers/${providerId}`;
        }
        /*eslint-enable*/
    };

    const inputValue = `curl -H 'Authorization: Bearer ${window.insights.getToken()}' \n -d '${data(item)}' ${url()}`;

    const displaySnippet = () => {
        /*eslint-disable*/
        switch (activeItem.action.toLowerCase()) {
            case 'token':
                return `export ICDC_TOKEN="${window.insights.getToken()}"`;
            case 'create':
                return `curl -X POST -H "Authorization: Bearer $ICDC_TOKEN" -H "X-MIQ-Group: ${user.account}.${user.role}" \n -d '${data(item, 'create')}' \n ${url()}`;
            case 'get':
                return `curl -H "Authorization: Bearer $ICDC_TOKEN" -H "X-MIQ-Group: ${user.account}.${user.role}" \n ${url()}`;
            case 'delete':
                return `curl -X POST -H "Authorization: Bearer $ICDC_TOKEN" -H "X-MIQ-Group: ${user.account}.${user.role}" \n -d '${data(item, 'delete')}' \n ${url()}`;
            case 'list':
                return `curl -H "Authorization: Bearer $ICDC_TOKEN" -H "X-MIQ-Group: ${user.account}.${user.role}" \n ${url()}`;

        }
        /*eslint-enable*/
    };

    const handleClose = () => {
        setOpen(false);
    };

    const copy = value => {
        const singleLineValue = value.replaceAll('\n', '');
        navigator.clipboard.writeText(singleLineValue)
            .catch(err => {
                console.log('Something went wrong', err); // eslint-disable-line no-console
            });
    };

    const determineActionsArray = () => {
        /*eslint-disable*/
        switch (element) {
            case 'vmTable':
                return ['TOKEN', 'CREATE', 'DELETE'];
            case 'allFirewalls':
                return ['TOKEN', 'LIST'];
            default:
                return ['TOKEN', 'GET', 'CREATE', 'DELETE'];
        }
        /*eslint-enable*/
    };

    const toolsArray = ['CURL'];

    const displayApiButton = (
        element === 'allFirewalls' ?
            <Button
                icon
                labelPosition='right'
                positive
                onClick={() => setOpen(true)}
            >
                API <Icon name='caret down' />
            </Button> :
            <button
                className='api-button'
                onClick={() => setOpen(true)} >
                API <Icon name='caret down' />
            </button>
    );

    return (
        <EscapeOutside onEscapeOutside={handleClose}>
            <div className='dropdown-api'>
                {displayApiButton}
                {element !== 'network' ?
                    <div className={(open === true ? 'visible ' : '') + 'menu-api '
                        + (direction === 'right' ? 'firewall-api-right' : 'firewall-api-left')}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className='api-dialog-content'>
                                <CodeSnippetOptions
                                    tabs={determineActionsArray()}
                                    navTitle='Action'
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                />
                                <CodeSnippetOptions
                                    tabs={toolsArray}
                                    navTitle='Tool'
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                />
                            </div>
                            <div className='api-dialog-snippet-wrapper'>
                                <CodeSnippet activeItem={activeItem.action.toLowerCase()} content={displaySnippet()} copyFuncion={copy} />
                            </div>
                        </div>
                    </div> :
                    <div className={(open === true ? 'visible ' : '') + 'menu-api ' + (direction === 'right' ? 'menu-api-right' : 'menu-api-left')}>
                        <Header className='menu-api_header' as='h4'>Use curl for this request</Header>
                        <div className='menu-api_copy-input'>
                            <input className='menu-api_input' value={inputValue} readOnly onFocus={(e) => e.target.select()} />
                            <button onClick={() => copy(inputValue)}><Icon name='copy' /></button>
                        </div>
                    </div>
                }
            </div>
        </EscapeOutside>
    );
};

ApiButton.propTypes = {
    direction: PropTypes.any,
    element: PropTypes.any,
    item: PropTypes.any,
    firewallGroup: PropTypes.object
};

export default ApiButton;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Network from '../../static/svgNetwork.svg';
import Loading from '../../static/spinner.gif';
import { networkPath } from '../../constants/routes';
import { copyInfo } from '../../utilities/copyInfo';
import OptionsMenu from '../../general/optionsMenu';
import { useSelector } from 'react-redux';
import { onSearch } from '../../utilities/search';
import NetworkModal from './networkModal';

const ApiButton = React.lazy(() => import('container/ApiButton'));

const NetworksList = ({ t, items }) => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const providerId = useSelector(state => state.VpcStore.providerId);
    const user = useSelector(state => state.host.user);
    const baseUrls = useSelector(state => state.host.baseUrls);
    const value = {
        dns: '213.222.50.226',
        emsRef: 'b9637c1d-71ee-4372-b6c9-52e1ab4e8089',
        id: '25000000000011',
        name: 'loc_icdc_name',
        netId: '25000000000011',
        subnet: '10.208.25.0/24',
        type: 'ipv4'
    };

    useEffect(() => {
        setFilteredData(onSearch(items[1], search));
    }, [search, items]);

    const emptyValue = String.fromCharCode(8212);
    const returnAsignedVM = (item) => {
        let vm = items[0].find(vm => vm && item && vm.netId === item.netId);
        return vm ? vm.vmsCount : 0;
    };

    const tableHeader = ['name', 'subnet', 'type', 'dns', 'assignedVmNics', ''];

    const tableHeaderCells = tableHeader.map((header, key) => (
        <Table.Cell key={key} style={{ borderBottom: '1px solid #D1D1D1' }}><b>{t(header)}</b></Table.Cell>))

    const networkList = filteredData.map((network, index) => {
        // const options = !returnAsignedVM(network) ? ['edit', 'delete'] : ['edit', 'view'];
        if (network) {
            const options = !returnAsignedVM(network) ? ['delete'] : ['view'];
            return (
                <Table.Row key={index}>
                    <Table.Cell>
                        <div className='name-with-image-wrapper'>
                            <img src={network.isLoading ? Loading : Network} />
                            <div>
                                {network.id ?
                                    <Link to={networkPath(network.id)}>{network.fullName}</Link>
                                    : network.name
                                }
                                <p>{network.name}</p>
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell>{network.subnet || emptyValue}
                        {network.subnet && copyInfo(network.subnet)}
                    </Table.Cell>
                    <Table.Cell>{network.type || emptyValue}</Table.Cell>
                    <Table.Cell>{network.dns || emptyValue}{network.dns && copyInfo(network.dns)}</Table.Cell>
                    <Table.Cell>
                        {
                            !returnAsignedVM(network) ? returnAsignedVM(network) :
                                <Link to={networkPath(network.id)}>
                                    {returnAsignedVM(network)}
                                </Link>
                        }
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='right'>
                        {(user.role === 'admin' || returnAsignedVM(network)) &&
                            <OptionsMenu t={t} type='networks' instance={network} options={options} /> || ''}
                    </Table.Cell>
                </Table.Row>
            );
        }
    });

    return <>
        <div style={{ maxWidth: '600px' }}><p className='color--grey'>{t('vpcDescription')}</p></div>
        <div className='vpcDescription'>
            <div>
                <p style={{ fontWeight: '700' }}>{t('search')}</p>
                <Input
                    icon='search'
                    iconPosition='left'
                    placeholder={t('searchField')}
                    value={search}
                    onChange={e => setSearch(e.currentTarget.value)}
                />
            </div>
            <div className='buttons-vpc'>
                <ApiButton element='network'
                    item={value}
                    user={user}
                    providerId={providerId}
                    locationUrl={baseUrls[user.location]}
                />
                <NetworkModal t={t} />
            </div>
        </div>
        <div className='table-container'>
            <Table unstackable basic='very'>
                <Table.Header>
                    <Table.Row>
                        {tableHeaderCells}
                    </Table.Row>
                </Table.Header>
                <Table.Body>{networkList}</Table.Body>
            </Table>
        </div>
        {search && filteredData.length === 0 &&
            <div className='empty-table'>{t('noSearchResults')}</div>
        }
    </>;
};

NetworksList.propTypes = {
    t: PropTypes.func,
    items: PropTypes.array
};

export default NetworksList;

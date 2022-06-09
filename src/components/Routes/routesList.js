import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Input } from 'semantic-ui-react';
import { copyInfo } from '../../utilities/copyInfo';
import TableHeader from '../../general/tableHeader';
import OptionsMenu from '../../general/optionsMenu';
import Route from '../../static/route.svg';
import { useSelector } from 'react-redux';
import { onSearch } from '../../utilities/search';
import RouteModal from './routeModal';

const ApiButton = React.lazy(() => import('container/ApiButton'));

const RoutesList = ({ t, items }) => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const headers = ['subnet', 'gateway', 'type', '', ''];
    const providerId = useSelector(state => state.VpcStore.providerId);
    const user = useSelector(state => state.host.user);
    const value = {
        destination: '10.220.0.0/16',
        nexthop: '10.220.0.2'
    };

    useEffect(() => {
        setFilteredData(onSearch(items, search));
    }, [search, items]);

    const routeList = filteredData.map((route, i) => {
        return (
            <Table.Row key={i}>
                <Table.Cell className='name-with-image-wrapper'>
                    <img src={Route} />
                    <div>
                        {route.destination} {copyInfo(route.destination)}
                    </div>
                </Table.Cell>
                <Table.Cell>{route.nexthop} {copyInfo(route.nexthop)}</Table.Cell>
                <Table.Cell>{'IPv4'}</Table.Cell>
                <Table.Cell textAlign='center'>
                </Table.Cell>
                <Table.Cell collapsing textAlign='right'>
                    {window.insights.getRole() === 'admin' && <OptionsMenu t={t} type='routes' instance={route} options={['delete']} />}
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            <div className='vpcDescription'>
                <div>
                    <p>{t('search')}</p>
                    <Input
                        icon='search'
                        iconPosition='left'
                        placeholder={t('searchField')}
                        value={search}
                        onChange={e => setSearch(e.currentTarget.value)}
                    />
                </div>
                <div className='buttons-vpc'>
                    <ApiButton element='route'
                        item={value}
                        user={user}
                        providerId={providerId}
                    />
                    <RouteModal t={t} />
                </div>
            </div>
            <div className='table-container'>
                <Table unstackable basic='very'>
                    <TableHeader t={t} headers={headers} />
                    <Table.Body>{routeList}</Table.Body>
                </Table>
            </div>
            {search && filteredData.length === 0 &&
                <div className='empty-table'>{t('noSearchResults')}</div>
            }
        </>
    );
};

RoutesList.propTypes = {
    t: PropTypes.func,
    items: PropTypes.array
};

export default RoutesList;

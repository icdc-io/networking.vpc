import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { copyInfo } from '../../utilities/copyInfo';
import TableHeader from '../../general/tableHeader';
import OptionsMenu from '../../general/optionsMenu';
import Route from '../../static/route.svg';
import { useSelector } from 'react-redux';

const ApiButton = React.lazy(() => import('container/ApiButton'));

const RoutesList = ({ t, items }) => {
    const headers = ['subnet', 'gateway', 'type', '', ''];
    const providerId = useSelector(state => state.VpcStore.providerId);
    const user = useSelector(state => state.host.user);
    const baseUrls = useSelector(state => state.host.baseUrls);

    const routeList = items.map((route, i) => {
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
                    <ApiButton element='route'
                        item ={route}
                        user={user}
                        providerId={providerId}
                        locationUrl={baseUrls[user.location]} />
                </Table.Cell>
                <Table.Cell collapsing textAlign='right'>
                    {window.insights.getRole() === 'admin' && <OptionsMenu t={t} type='routes' instance={route} options={['delete']}/>}
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <Table unstackable>
            <TableHeader t={t} headers={headers}/>
            <Table.Body>{routeList}</Table.Body>
        </Table>
    );
};

RoutesList.propTypes = {
    t: PropTypes.func,
    items: PropTypes.array
};

export default RoutesList;

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import ApiButton from '../../general/apiButton';
import { copyInfo } from '../../utilities/copyInfo';
import TableHeader from '../../general/tableHeader';
import OptionsMenu from '../../general/optionsMenu';
import Route from '../../static/route.svg';

const RoutesList = ({ items }) => {
    const headers = ['subnet', 'gateway', 'type', '', ''];

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
                <Table.Cell textAlign='center'><ApiButton element='route' item ={route} /></Table.Cell>
                <Table.Cell collapsing textAlign='right'>
                    {window.insights.getRole() === 'admin' && <OptionsMenu type='routes' instance={route} options={['delete']}/>}
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <Table unstackable>
            <TableHeader headers={headers}/>
            <Table.Body>{routeList}</Table.Body>
        </Table>
    );
};

RoutesList.propTypes = {
    items: PropTypes.array
};

export default RoutesList;

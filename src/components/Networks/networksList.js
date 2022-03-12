import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import ApiButton from '../../general/apiButton';
import { Link, useParams } from 'react-router-dom';
import Network from '../../static/svgNetwork.svg';
import Loading from '../../static/spinner.gif';
import { networkPath } from '../../constants/routes';
import { copyInfo } from '../../utilities/copyInfo';
import OptionsMenu from '../../general/optionsMenu';

const NetworksList = ({ items, intl }) => {
    const { menuGroup } = useParams();
    const emptyValue = String.fromCharCode(8212);
    const returnAsignedVM = (item) => {
        let vm = items[0].find(vm => vm.netId === item.netId);
        return vm ? vm.vmsCount : 0;
    };

    const networkList = items[1].map((network, index) => {
        // const options = !returnAsignedVM(network) ? ['edit', 'delete'] : ['edit', 'view'];
        const options = !returnAsignedVM(network) ? ['delete'] : ['view'];

        return (
            <Table.Row key={index}>
                <Table.Cell>
                    <div className='name-with-image-wrapper'>
                        <img src={network.isLoading ? Loading : Network} />
                        <div>
                            {network.id ?
                                <Link to={networkPath(network.id, menuGroup)}>{network.name}</Link>
                                : network.name
                            }
                        </div>
                    </div>
                </Table.Cell>
                <Table.Cell>{intl.formatMessage(messages.subnet)}: {network.subnet || emptyValue}
                    {network.subnet && copyInfo(network.subnet)}
                </Table.Cell>
                <Table.Cell>{intl.formatMessage(messages.type)}: {network.type || emptyValue}</Table.Cell>
                <Table.Cell>DNS: {network.dns || emptyValue}{network.dns && copyInfo(network.dns)}</Table.Cell>
                <Table.Cell textAlign='center'>
                    {intl.formatMessage(messages.assignedNics)}: {
                        !returnAsignedVM(network) ? returnAsignedVM(network) :
                            <Link to={networkPath(network.id, menuGroup)}>
                                {returnAsignedVM(network)}
                            </Link>
                    }
                </Table.Cell>
                <Table.Cell textAlign='center'><ApiButton element='network' item={network} /></Table.Cell>
                <Table.Cell collapsing textAlign='right'>
                    {(window.insights.getRole() === 'admin' || returnAsignedVM(network)) &&
                        <OptionsMenu type='networks' instance={network} options={options} /> || ''}
                </Table.Cell>
            </Table.Row>
        );
    });

    return <Table unstackable>
        <Table.Body>{networkList}</Table.Body>
    </Table>;
};

NetworksList.propTypes = {
    intl: PropTypes.any,
    items: PropTypes.array
};

export default injectIntl(NetworksList);

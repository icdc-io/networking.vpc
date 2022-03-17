import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Network from '../../static/svgNetwork.svg';
import Loading from '../../static/spinner.gif';
import { networkPath } from '../../constants/routes';
import { copyInfo } from '../../utilities/copyInfo';
import OptionsMenu from '../../general/optionsMenu';
import { useSelector } from 'react-redux';

const ApiButton = React.lazy(() => import('container/ApiButton'));

const NetworksList = ({ t, items }) => {
    const providerId = useSelector(state => state.VpcStore.providerId);
    const user = useSelector(state => state.host.user);

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
                                <Link to={networkPath(network.id)}>{network.name}</Link>
                                : network.name
                            }
                        </div>
                    </div>
                </Table.Cell>
                <Table.Cell>{t('subnet')}: {network.subnet || emptyValue}
                    {network.subnet && copyInfo(network.subnet)}
                </Table.Cell>
                <Table.Cell>{t('type')}: {network.type || emptyValue}</Table.Cell>
                <Table.Cell>DNS: {network.dns || emptyValue}{network.dns && copyInfo(network.dns)}</Table.Cell>
                <Table.Cell textAlign='center'>
                    {t('assignedNics')}: {
                        !returnAsignedVM(network) ? returnAsignedVM(network) :
                            <Link to={networkPath(network.id)}>
                                {returnAsignedVM(network)}
                            </Link>
                    }
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <ApiButton element='network'
                        item={network}
                        user={user}
                        providerId={providerId} />
                </Table.Cell>
                <Table.Cell collapsing textAlign='right'>
                    {(window.insights.getRole() === 'admin' || returnAsignedVM(network)) &&
                        <OptionsMenu t={t} type='networks' instance={network} options={options} /> || ''}
                </Table.Cell>
            </Table.Row>
        );
    });

    return <Table unstackable>
        <Table.Body>{networkList}</Table.Body>
    </Table>;
};

NetworksList.propTypes = {
    t: PropTypes.func,
    items: PropTypes.array
};

export default NetworksList;

import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import {
    assignNicsToSecurityGroupAndFetch,
} from '../../AppActions';
import Network from '../../static/svgNetwork.svg';
import NetworkModal from '../Networks/networkModal';
import ReturnVmTable from './returnVmTable';
import PropTypes from 'prop-types';
import { copyInfo } from '../../utilities/copyInfo';
import DeleteModal from '../../general/deleteModal';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const ApiButton = React.lazy(() => import('container/ApiButton'));

const NetworkDetailsContent = ({ t, items: [network, group, providerId, user] }) => {
    const baseUrls = useSelector(state => state.host.baseUrls);
    const dispatch = useDispatch();
    const { id } = useParams();

    const assignNicsAndFetch = (nics) => {
        const payload = {
            action: 'additional_nics',
            // eslint-disable-next-line camelcase
            vms_ids: nics
        };
        dispatch(assignNicsToSecurityGroupAndFetch(payload, id));
    };

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column className='inline-cell-wrapper'>
                    <div className='name-with-image-wrapper'>
                        <img src={Network} />
                        <div>
                            {network.name}
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <ApiButton direction='right'
                        element='network'
                        item={network}
                        user={user}
                        providerId={providerId}
                        locationUrl={baseUrls[user.location]} />
                </Grid.Column>
                <Grid.Column width={2}><NetworkModal t={t} edit details network={network} /></Grid.Column>
            </Grid.Row>
            <Header className='network-details' as='h4'>{t('netDetails')}</Header>
            <Grid.Row className='network-table'>
                <Grid.Column className='network-table-title'>{t('subnet')}</Grid.Column>
                <Grid.Column className='network-table-content'>
                    {network.subnet || String.fromCharCode(8212)}{copyInfo(network.subnet)}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className='network-table'>
                <Grid.Column className='network-table-title'>{t('type')}</Grid.Column>
                <Grid.Column className='network-table-content'>{network.type || String.fromCharCode(8212)}</Grid.Column>
            </Grid.Row>
            <Grid.Row className='network-table'>
                <Grid.Column className='network-table-title'>DNS</Grid.Column>
                <Grid.Column className='network-table-content'>{network.dns || String.fromCharCode(8212)}{copyInfo(network.dns)}</Grid.Column>
            </Grid.Row>
            <ReturnVmTable t={t}
                showModalButton
                onModalSubmit={assignNicsAndFetch}
                headerMesage={t('assignedVm')}
                vmInterfaces={network.assignedVms}
                group={group} />
            <div className='network-delete'>
                <div className='network-delete_desc'>
                    <div><b>{t('delete').toUpperCase()}</b></div>
                    <div>{t('deleteVpsDetailsDesc')}</div>
                </div>
                <div><DeleteModal t={t} type='networks' button instance={network} /></div>
            </div>
        </Grid>
    )
};

NetworkDetailsContent.propTypes = {
    t: PropTypes.func,
    items: PropTypes.array
}

export default NetworkDetailsContent;

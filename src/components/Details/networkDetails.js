import React, { useEffect } from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNetwork, assignNicsToSecurityGroupAndFetch, fetchSecurityGroups, fetchSecurityGroup } from '../../AppActions';
import ApiButton from '../../general/apiButton';
import Network from '../../static/svgNetwork.svg';
import NetworkModal from '../Networks/networkModal';
import ReturnVmTable from './returnVmTable';
import messages from '../../Messages';
import PropTypes from 'prop-types';
import ButtonBack from '../../general/buttonBack';
import { networksPath } from '../../constants/routes';
import { copyInfo } from '../../utilities/copyInfo';
import DeleteModal from '../../general/deleteModal';
import { withRouter } from 'react-router-dom';

const NetworkDetails = ({ intl, history }) => {
    const { id, menuGroup } = useParams();
    const currNetwork = useSelector(state => state.VpcStore.network);
    const group = useSelector(state => state.VpcStore.group);
    const networkFetchStatus = useSelector(state => state.VpcStore.networkFetchStatus);

    window.goToRootRoute = () => history.push('/networks');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNetwork(id));
        dispatch(fetchSecurityGroups());
        dispatch(fetchSecurityGroup(id));
    }, [dispatch, id]);

    const assignNicsAndFetch = (nics) => {
        const payload = {
            action: 'add_to_port',
            // eslint-disable-next-line camelcase
            nic_ids: nics
        };
        dispatch(assignNicsToSecurityGroupAndFetch(payload, group.id));
    };

    let infoVM = networkFetchStatus === 'fulfilled' ?
        <ReturnVmTable showModalButton
            onModalSubmit={assignNicsAndFetch}
            headerMesage={intl.formatMessage(messages.assignedVm)}
            vmInterfaces={currNetwork.assignedVms} />
        :
        <Loader active inline='centered' className="firewall-loader" />;

    return <>
        <ButtonBack path={networksPath(menuGroup)} />
        <Grid>
            <Grid.Row verticalAlign='middle'>
                <Grid.Column className='inline-cell-wrapper'>
                    <div className='name-with-image-wrapper'>
                        <img src={Network} />
                        <div>
                            {currNetwork.name}
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column ><ApiButton direction='right' element='network' item ={currNetwork} /></Grid.Column>
                <Grid.Column width={2}><NetworkModal edit details network={currNetwork}/></Grid.Column>
            </Grid.Row>
            <Header className='network-details' as='h4'>{intl.formatMessage(messages.netDetails)}</Header>
            <Grid.Row className='network-table' verticalAlign='middle'>
                <Grid.Column className='network-table-title'>{intl.formatMessage(messages.subnet)}</Grid.Column>
                <Grid.Column className='network-table-content'>
                    {currNetwork.subnet || String.fromCharCode(8212)}{copyInfo(currNetwork.subnet)}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign='middle' className='network-table'>
                <Grid.Column className='network-table-title'>{intl.formatMessage(messages.type)}</Grid.Column>
                <Grid.Column className='network-table-content'>{currNetwork.type || String.fromCharCode(8212)}</Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign='middle' className='network-table'>
                <Grid.Column className='network-table-title'>DNS</Grid.Column>
                <Grid.Column className='network-table-content'>{currNetwork.dns || String.fromCharCode(8212)}{copyInfo(currNetwork.dns)}</Grid.Column>
            </Grid.Row>
            {infoVM}
            <Grid.Row verticalAlign='middle' className='network-delete'>
                <Grid.Column width={2}><b>{intl.formatMessage(messages.delete).toUpperCase()}</b></Grid.Column>
                <Grid.Column width={5}>{intl.formatMessage(messages.deleteVpsDetailsDesc)}</Grid.Column>
                <Grid.Column width={2}><DeleteModal type='networks' button instance={currNetwork} /></Grid.Column>
            </Grid.Row>
        </Grid>
    </>;
};

NetworkDetails.propTypes = {
    intl: PropTypes.any,
    history: PropTypes.any
};

export default injectIntl(withRouter(NetworkDetails));

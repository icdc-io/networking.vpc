import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentPage from '../../general/contentPage';
import NetworksList from './networksList';
import NetworkModal from './networkModal';
import { fetchNetworks, fetchVMs, fetchProvider } from '../../AppActions';
import messages from '../../Messages';
import { withRouter } from 'react-router-dom';

const Networks = ({ history }) => {
    const networks = useSelector(state => state.VpcStore.networks);
    const vms = useSelector(state => state.VpcStore.assignedVms);
    const vmsFetchStatus = useSelector(state => state.VpcStore.assignedVmsFetchStatus);
    const user = useSelector(state => state.host.user);

    window.goToRootRoute = () => history.push('/networks');

    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(user).length === 0) return; // eslint-disable-line curly
        dispatch(fetchNetworks());
        dispatch(fetchVMs());
        dispatch(fetchProvider());
    }, [dispatch, user.location, user.role, user.account, user]);

    return (
        <ContentPage status={vmsFetchStatus} pageData={networks.length ? [vms, networks] : []} title={messages.vpcNetworks}
            componentDataList={NetworksList} componentModal={NetworkModal} noContentMessage={messages.noNetworks}
        />
    );
};

export default withRouter(Networks);

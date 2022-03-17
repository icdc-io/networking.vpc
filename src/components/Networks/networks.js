import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NetworksList from './networksList';
import NetworkModal from './networkModal';
import { fetchNetworks, fetchVMs, fetchProvider } from '../../AppActions';
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

const ContentPage = React.lazy(() => import('container/ContentPage'));

const Networks = ({ t, history }) => {
    const networks = useSelector(state => state.VpcStore.networks);
    const networksFetchStatus = useSelector(state => state.VpcStore.networksFetchStatus);
    const vms = useSelector(state => state.VpcStore.assignedVms);
    const vmsFetchStatus = useSelector(state => state.VpcStore.assignedVmsFetchStatus);
    const providerIdFetchStatus = useSelector(state => state.VpcStore.providerIdFetchStatus);
    const user = useSelector(state => state.host.user);

    window.goToRootRoute = () => history.push('/vpc');

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.location) {
            dispatch(fetchNetworks());
            dispatch(fetchVMs());
            providerIdFetchStatus !== 'fulfilled' && dispatch(fetchProvider());
        }
    }, [dispatch, user]);

    return (
        <React.Suspense fallback={
            <Loader active inline='centered' />
        }>
        <ContentPage t={t} statuses={[vmsFetchStatus, networksFetchStatus, providerIdFetchStatus]} pageData={networks.length ? [vms, networks] : []} title={'vpcNetworks'}
            componentDataList={NetworksList} componentModal={NetworkModal} noContentMessage={'noNetworks'}
        />
        </React.Suspense>
    );
};

export default withRouter(Networks);

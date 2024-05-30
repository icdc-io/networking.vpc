import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NetworksList from './networksList';
import NetworkModal from './networkModal';
import { fetchNetworks, fetchVMs, fetchProvider } from '../../AppActions';
import { withRouter } from 'react-router-dom';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { networkValue } from '../../constants/common';

const ContentPage = React.lazy(() => import('container/ContentPage'));
const ApiButton = React.lazy(() => import('container/ApiButton'));

const Networks = ({ t, history }) => {
    const networks = useSelector(state => state.VpcStore.networks);
    const networksFetchStatus = useSelector(state => state.VpcStore.networksFetchStatus);
    const vms = useSelector(state => state.VpcStore.assignedVms);
    const vmsFetchStatus = useSelector(state => state.VpcStore.assignedVmsFetchStatus);
    const providerIdFetchStatus = useSelector(state => state.VpcStore.providerIdFetchStatus);
    const user = useSelector(state => state.host.user);
    const baseUrls = useSelector(state => state.host.baseUrls);
    const providerId = useSelector(state => state.VpcStore.providerId);

    window.goToRootRoute = () => history.push('/vpc');

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.location) {
            dispatch(fetchNetworks());
            dispatch(fetchVMs());
            providerIdFetchStatus !== 'fulfilled' && dispatch(fetchProvider());
        }
    }, [dispatch, user]);

    const isNoData = networks.length < 1;

    return (
        <React.Suspense fallback={
            <Loader active inline='centered' />
        }>
        {isNoData && (
            <Grid className='no-vpc-networks-header'>
                <Grid.Row style={{padding: "0"}}>
                    <Header as='h4' content={t('vpcNetworks')} />
                    <div className='buttons-vpc'>
                        <ApiButton element='network'
                            item={networkValue}
                            user={user}
                            providerId={providerId}
                            locationUrl={baseUrls[user.location]}
                        />
                        <NetworkModal t={t} />
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <div style={{ maxWidth: '600px' }}>
                        <p className='color--grey'>{t('vpcDescription')}</p>
                    </div>
                </Grid.Row>
            </Grid>
        )}
        <ContentPage t={t} statuses={[vmsFetchStatus, networksFetchStatus, providerIdFetchStatus]} pageData={networks.length ? [vms, networks] : []} title={isNoData ? "" : 'vpcNetworks'}
            componentDataList={NetworksList} noContentMessage={'noNetworks'} 
        />
        </React.Suspense>
    );
};

export default withRouter(Networks);

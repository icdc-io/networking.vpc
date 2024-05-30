import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoutesList from './routesList';
import { fetchRoutes, fetchProvider } from '../../AppActions';
import { withRouter } from 'react-router-dom';
import { Grid, Header, Loader } from 'semantic-ui-react';
import RouteModal from './routeModal';
import { routesValue } from '../../constants/common';

const ContentPage = React.lazy(() => import('container/ContentPage'));
const ApiButton = React.lazy(() => import('container/ApiButton'));

const Routes = ({ t, history }) => {
    const routes = useSelector(state => state.VpcStore.routes);
    const routesFetchStatus = useSelector(state => state.VpcStore.routesFetchStatus);
    const providerIdFetchStatus = useSelector(state => state.VpcStore.providerIdFetchStatus);
    const user = useSelector(state => state.host.user);
    const baseUrls = useSelector(state => state.host.baseUrls);
    const routerId = useSelector(state => state.VpcStore.routerId);

    window.goToRootRoute = () => history.push('/vpc');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoutes());
        providerIdFetchStatus !== 'fulfilled' && dispatch(fetchProvider());
    }, [dispatch, user]);

    const isNoData = routes.length < 1;

    return (
        <React.Suspense fallback={
            <Loader active inline='centered' />
        }>
        {isNoData && (
            <Grid className='no-vpc-routes-header'>
                <Grid.Row style={{padding: "0"}}>
                    <Header as='h4' content={t('routes')} />
                    <div className='buttons-vpc'>
                        <ApiButton element='route'
                            item={routesValue}
                            user={user}
                            providerId={routerId}
                            locationUrl={baseUrls[user.location]}
                        />
                        <RouteModal t={t} />
                    </div>
                </Grid.Row>
            </Grid>
        )}
        <ContentPage t={t} statuses={[routesFetchStatus, providerIdFetchStatus]} pageData={routes} title={isNoData ? '' : 'routes'}
            componentDataList={RoutesList} noContentMessage={'noRoutes'}
        />
        </React.Suspense>
    );
};

export default withRouter(Routes);

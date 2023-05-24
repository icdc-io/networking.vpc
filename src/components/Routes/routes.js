import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RoutesList from './routesList';
import { fetchRoutes, fetchProvider } from '../../AppActions';
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import RouteModal from './routeModal';

const ContentPage = React.lazy(() => import('container/ContentPage'));

const Routes = ({ t, history }) => {
    const routes = useSelector(state => state.VpcStore.routes);
    const routesFetchStatus = useSelector(state => state.VpcStore.routesFetchStatus);
    const providerIdFetchStatus = useSelector(state => state.VpcStore.providerIdFetchStatus);
    const user = useSelector(state => state.host.user);

    window.goToRootRoute = () => history.push('/vpc');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoutes());
        providerIdFetchStatus !== 'fulfilled' && dispatch(fetchProvider());
    }, [dispatch, user]);

    return (
        <React.Suspense fallback={
            <Loader active inline='centered' />
        }>
        <ContentPage t={t} statuses={[routesFetchStatus, providerIdFetchStatus]} pageData={routes} title={'routes'}
            componentDataList={RoutesList} noContentMessage={'noRoutes'} noContentComponentModal={RouteModal}
        />
        </React.Suspense>
    );
};

export default withRouter(Routes);

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentPage from '../../general/contentPage';
import RouteModal from './routeModal';
import RoutesList from './routesList';
import { fetchRoutes } from '../../AppActions';
import messages from '../../Messages';
import { withRouter } from 'react-router-dom';

const Routes = ({ history }) => {
    const routes = useSelector(state => state.VpcStore.routes);
    const routesFetchStatus = useSelector(state => state.VpcStore.routesFetchStatus);
    const user = useSelector(state => state.host.user);

    window.goToRootRoute = () => history.push('/routes');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRoutes());
    }, [dispatch, user]);

    return (
        <ContentPage status={routesFetchStatus} pageData={routes} title={messages.routes}
            componentDataList={RoutesList} componentModal={RouteModal} noContentMessage={messages.noRoutes}
        />
    );
};

export default withRouter(Routes);

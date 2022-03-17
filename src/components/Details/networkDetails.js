import React, { useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchNetwork,
    fetchSecurityGroups,
    fetchSecurityGroup,
    fetchProvider
} from '../../AppActions';
import NetworkDetailsContent from './networkDetailsContent';
import PropTypes from 'prop-types';
import { networksPath } from '../../constants/routes';
import { withRouter } from 'react-router-dom';
import ButtonBack from '../../general/buttonBack';

const ContentPage = React.lazy(() => import('container/ContentPage'));

const NetworkDetails = ({ t, history }) => {
    const { id } = useParams();
    const network = useSelector(state => state.VpcStore.network);
    const networkFetchStatus = useSelector(state => state.VpcStore.networkFetchStatus);
    const group = useSelector(state => state.VpcStore.group);
    const groupFetchStatus = useSelector(state => state.VpcStore.groupFetchStatus);
    const providerId = useSelector(state => state.VpcStore.providerId);
    const providerIdFetchStatus = useSelector(state => state.VpcStore.providerIdFetchStatus);
    const user = useSelector(state => state.host.user);

    window.goToRootRoute = () => history.push('/vpc');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNetwork(id));
        dispatch(fetchSecurityGroups());
        dispatch(fetchSecurityGroup(id));
        providerIdFetchStatus !== 'fulfilled' && dispatch(fetchProvider());
    }, [dispatch, id, user]);

    return (
        <React.Suspense fallback={
            <Loader active inline='centered' />
        }>
        <ContentPage
            t={t}
            statuses={[providerIdFetchStatus, networkFetchStatus]}
            pageData={[network, group, providerId, user]}
            componentDataList={NetworkDetailsContent}
            noContentMessage={'noSecurityGroups'}
        >
        <Grid.Row className="content-page__header">
            <ButtonBack back={t('back')} style={{ marginLeft: 15 }} path={networksPath()} />
        </Grid.Row>
    </ContentPage>
    </React.Suspense>
    )
};

NetworkDetails.propTypes = {
    history: PropTypes.any
};

export default withRouter(NetworkDetails);

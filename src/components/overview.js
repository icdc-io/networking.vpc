import React from 'react';
import { Redirect, withRouter, Switch, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import TabsLayout from '../general/tabsLayout';
import { networksPath, networkPath, routesPath } from '../constants/routes';
import { PropTypes } from 'prop-types';

const NetworkDetails = React.lazy(() => import('./Details/networkDetails'));
const Networks = React.lazy(() => import('./Networks/networks'));
const Routes = React.lazy(() => import('./Routes/routes'));

const NetworksOverview = ({ t }) => {
    const menuItems = [
        {
            name: t('networks'),
            path: 'networks',
            component: Networks
        },
        {
            name: t('routes'),
            path: 'routes',
            component: Routes
        }
    ];

    return <>
        <TabsLayout menuItems={menuItems} />
        <Segment attached='bottom'>
            <Switch>
                <Route exact path={networksPath()} render={() => <Networks t={t} />} />
                <Route exact path={networkPath()} render={() => <NetworkDetails t={t} />} />
                <Route exact path={routesPath()} render={() => <Routes t={t} />} />
                <Redirect to={`/vpc/${menuItems[0].path}`} />
            </Switch>
        </Segment>
    </>;
};

NetworksOverview.propTypes = {
    t: PropTypes.func
};

export default withRouter(NetworksOverview);

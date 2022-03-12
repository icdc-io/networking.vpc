import React from 'react';
import { injectIntl } from 'react-intl';
import { Redirect, withRouter, Switch, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import TabsLayout from '../general/tabsLayout';
import { networksPath, networkPath, routesPath } from '../constants/routes';
import { PropTypes } from 'prop-types';
import messages from '../Messages';

const NetworkDetails = React.lazy(() => import('./Details/networkDetails'));
const Networks = React.lazy(() => import('./Networks/networks'));
const Routes = React.lazy(() => import('./Routes/routes'));

const NetworksOverview = ({ intl }) => {
    const menuItems = [
        {
            name: intl.formatMessage(messages.networks),
            path: 'networks',
            component: Networks
        },
        {
            name: intl.formatMessage(messages.routes),
            path: 'routes',
            component: Routes
        }
    ];

    return <>
        <TabsLayout menuItems={menuItems} />
        <Segment attached='bottom'>
            <Switch>
                <Route exact path={networksPath()} component={Networks} />
                <Route exact path={networkPath()} component={NetworkDetails} />
                <Route exact path={routesPath()} component={Routes} />
                <Redirect to={`/vpc/${menuItems[0].path}`} />
            </Switch>
        </Segment>
    </>;
};

NetworksOverview.propTypes = {
    intl: PropTypes.any
};

export default injectIntl(withRouter(NetworksOverview));

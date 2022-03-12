import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';

const ItemHeader = ({ title, traefik, intl, isTabbedView }) => {
    return (
        <Grid.Column verticalAlign='middle' width={4} style={isTabbedView ? { marginTop: 25 } : {}}>
            <Header as='h4' style={traefik && { fontSize: '20px' }} >{intl.formatMessage(title)}</Header>
        </Grid.Column>
    );
};

ItemHeader.propTypes = {
    intl: PropTypes.any,
    title: PropTypes.any,
    traefik: PropTypes.bool,
    isTabbedView: PropTypes.bool
};

export default injectIntl(ItemHeader);

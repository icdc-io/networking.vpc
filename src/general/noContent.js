import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const NoContent = ({ intl, textMessage, icon }) =>
    <Segment placeholder>
        <Header icon>
            <Icon name={icon === 'frown' || icon === 'meh' ? icon + ' outline' : icon} />
            {intl.formatMessage(textMessage)}
        </Header>
    </Segment>;

NoContent.propTypes = {
    intl: PropTypes.any,
    textMessage: PropTypes.object,
    icon: PropTypes.string
};

export default injectIntl(NoContent);

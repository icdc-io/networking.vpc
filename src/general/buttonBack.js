import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import messages from '../Messages';

const ButtonBack = ({ intl, path }) => {
    return (
        <Link to={path}>
            <Button className="back back__top" labelPosition='left' icon='left chevron' content={intl.formatMessage(messages.back)} />
        </Link>
    );
};

ButtonBack.propTypes = {
    intl: PropTypes.any,
    path: PropTypes.any
};

export default injectIntl(ButtonBack);

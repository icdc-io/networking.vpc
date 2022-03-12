/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import NetworkModal from '../components/Networks/networkModal';
import DeleteModal from './deleteModal';
import RouteModal from '../components/Routes/routeModal';
import messages from '../Messages';
import { networkPath } from '../constants/routes';
import { Link, useParams } from 'react-router-dom';

const OptionsMenu = ({ type, instance, options, intl, onClickAction }) => {
    const { menuGroup } = useParams();
    const actions = {
        networks: {
            edit: (network, key) => <NetworkModal key={key} edit network={network} />,
            view: (network, key) => <Link key={key} role='option' className='item' to={networkPath(network.id, menuGroup)}>
                {/* TODO: onclick action */}
                <Dropdown.Item text={intl.formatMessage(messages.viewVmNics)} onClick={() => { }} />
            </Link>,
            delete: (network, key) => <DeleteModal key={key} type={type} instance={network} />
        },
        routes: {
            edit: (route, key) => <RouteModal key={key} edit route={route} />,
            delete: (route, key) => <DeleteModal key={key} type={type} instance={route} />
        }
    };

    return (
        <Dropdown direction='left' icon='ellipsis vertical' className='users-list__actions_dot'>
            <Dropdown.Menu>
                {options.map((option, key) => actions[type][option](instance, key))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

OptionsMenu.propTypes = {
    intl: PropTypes.any,
    instance: PropTypes.object,
    type: PropTypes.string,
    options: PropTypes.array,
    onClickAction: PropTypes.func
};

export default injectIntl(OptionsMenu);

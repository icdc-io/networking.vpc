/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import NetworkModal from '../components/Networks/networkModal';
import DeleteModal from './deleteModal';
import RouteModal from '../components/Routes/routeModal';
import { networkPath } from '../constants/routes';
import { Link } from 'react-router-dom';

const OptionsMenu = ({ t, type, instance, options, onClickAction }) => {
    const actions = {
        networks: {
            edit: (network, key) => <NetworkModal t={t} key={key} edit network={network} />,
            view: (network, key) => <Link key={key} role='option' className='item' to={networkPath(network.id)}>
                {/* TODO: onclick action */}
                <Dropdown.Item text={t('viewVmNics')} onClick={() => { }} />
            </Link>,
            delete: (network, key) => <DeleteModal t={t} key={key} type={type} instance={network} />
        },
        routes: {
            edit: (route, key) => <RouteModal t={t} key={key} edit route={route} />,
            delete: (route, key) => <DeleteModal t={t} key={key} type={type} instance={route} />
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
    t: PropTypes.func,
    instance: PropTypes.object,
    type: PropTypes.string,
    options: PropTypes.array,
    onClickAction: PropTypes.func
};

export default OptionsMenu;

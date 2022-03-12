import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Header, Button, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import RouteForm from './routeForm';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import { createRouteActionAndFetch } from '../../AppActions';

const RouteModal = ({ edit, route, intl }) => {
    const [open, setOpen] = useState(false);
    const routerId = useSelector(state => state.VpcStore.routerId);
    const oldSubnet = edit && route.destination;

    const dispatch = useDispatch();

    const mapRouteToProps = (item) => (
        {
            subnet: item.destination,
            gateway: item.nexthop,
            type: 'IPv4'
        }
    );

    const mapPropsToApi = (item) => (
        edit ?
            {
                action: 'edit_route',
                oldDestination: oldSubnet,
                newRoute: {
                    destination: item.subnet,
                    nexthop: item.gateway
                }
            }
            :
            {
                action: 'add_route',
                destination: item.subnet,
                nexthop: item.gateway
            }
    );

    const handleClose = useCallback(
        () => {
            setOpen(false);
        },
        [setOpen]
    );

    const onSubmit = useCallback(
        (values) => {
            handleClose();
            let payload = mapPropsToApi(values);
            dispatch(createRouteActionAndFetch(payload, routerId));
        },
        [handleClose, dispatch, routerId]
    );

    const headerContent = edit ? intl.formatMessage(messages.editRoute) : intl.formatMessage(messages.createRoute);

    const buttonModal = edit ?
        <Dropdown.Item text= {intl.formatMessage(messages.editRoute)} onClick={() => setOpen(true)} /> :
        <Button onClick={() => setOpen(true)} primary>{intl.formatMessage(messages.createRoute)}</Button>;

    const routeForm = <RouteForm handleClose={handleClose} onSubmit={onSubmit} initialValues={edit && mapRouteToProps(route)} edit={edit} />;

    return window.insights.getRole() === 'admin' && <>
        {buttonModal}
        <Modal open={open} size={'tiny'} onSubmit={onSubmit} onClose={handleClose} closeIcon>
            <Header content={headerContent} onClick={handleClose}  />
            <Modal.Content>{routeForm}</Modal.Content>
        </Modal>
    </>;
};

RouteModal.propTypes = {
    edit: PropTypes.bool,
    route: PropTypes.any,
    intl: PropTypes.any
};

export default injectIntl(RouteModal);

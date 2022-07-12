import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Header, Button, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import RouteForm from './routeForm';
import { createRouteActionAndFetch } from '../../AppActions';

const RouteModal = ({ t, edit, route }) => {
    const [open, setOpen] = useState(false);
    const routerId = useSelector(state => state.VpcStore.routerId);
    const oldSubnet = edit && route.destination;
    const user = useSelector(state => state.host.user);

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

    const headerContent = edit ? t('editRoute') : t('createRoute');

    const buttonModal = edit ?
        <Dropdown.Item text= {t('editRoute')} onClick={() => setOpen(true)} /> :
        <Button onClick={() => setOpen(true)} primary>{t('createRoute')}</Button>;

    const routeForm = <RouteForm t={t} handleClose={handleClose} onSubmit={onSubmit} initialValues={edit && mapRouteToProps(route)} edit={edit} />;

    return user.role === 'admin' && <>
        {buttonModal}
        <Modal open={open} size={'tiny'} onSubmit={onSubmit} onClose={handleClose} closeIcon>
            <Header content={headerContent} onClick={handleClose}  />
            <Modal.Content>{routeForm}</Modal.Content>
        </Modal>
    </>;
};

RouteModal.propTypes = {
    t: PropTypes.func,
    edit: PropTypes.bool,
    route: PropTypes.any
};

export default RouteModal;

import React, { useState, useCallback } from 'react';
import { Modal, Header, Button, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import NetworkForm from './networkForm';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import { createNetworkActionAndFetch, editNetworkActionAndFetch, infoNotification, addTemporaryNetwork } from '../../AppActions';
import { useSelector, useDispatch } from 'react-redux';

const NetworkModal = ({ network, edit, intl, details }) => {
    const [open, setOpen] = useState(false);
    const providerId = useSelector(state => state.VpcStore.providerId);
    const dispatch = useDispatch();
    const user = useSelector(state => state.host.user);

    /* eslint camelcase: 0 */
    const mapApiToProps = (item) => (
        {
            name: item.name,
            type: 'ipv4',
            subnet: item.subnet,
            dns: item.dns,
            netId: item.netId,
            emsRef: item.emsRef,
            addSubnet: !!item.subnet
        }
    );

    const mapPropsToApi = useCallback(
        (item) => {
            const network = {
                action: edit ? 'edit' : 'create',
                id: item.netId,
                name: item.name
            };
            const subnet = {
                subnet:
                {
                    cidr: item.subnet,
                    ip_version: 4,
                    network_protocol: item.type,
                    dns_nameservers: [item.dns],
                    name: item.name
                }
            };

            return item.addSubnet ? { ...network, ...subnet } : network;
        },
        [edit]
    );

    const mapPropsToNetworkObj = (values) => {
        return {
            isLoading: true,
            name: `${user.location}_${user.account}_${values.name}`,
            subnet: values.subnet,
            type: values.type,
            dns: values.dns
        };
    };

    const handleClose = useCallback(
        () => {
            setOpen(false);
        },
        [setOpen]
    );

    const createNetwork = (values, providerId) => {
        dispatch(createNetworkActionAndFetch(mapPropsToApi(values), providerId));
        dispatch(addTemporaryNetwork(mapPropsToNetworkObj(values)));
    };

    const onSubmit = useCallback(
        (values) => {
            infoNotification(intl.formatMessage(messages.creatingNetwork));
            edit ?
                dispatch(editNetworkActionAndFetch(mapPropsToApi(values), providerId)) :
                createNetwork(values, providerId);
            handleClose();
        },
        [dispatch, providerId, handleClose, mapPropsToApi, edit, intl, user]
    );

    const headerContent = edit ? intl.formatMessage(messages.editVps) : intl.formatMessage(messages.createVps);
    const buttonModal = edit ?
        // details ?
        //     <Button onClick={() => setOpen(true)} basic compact size='tiny' color='black' content={intl.formatMessage(messages.editVps)}/> :
        !details && <Dropdown.Item text={intl.formatMessage(messages.editVps)} onClick={() => setOpen(true)} /> :
        <Button onClick={() => setOpen(true)} primary>{intl.formatMessage(messages.createVps)}</Button>;
    return window.insights.getRole() === 'admin' && <>
        {buttonModal}
        <Modal open={open} size="tiny" onSubmit={onSubmit} onClose={handleClose}>
            <Header content={headerContent} />
            <Modal.Content>
                <NetworkForm
                    open={open}
                    handleClose={handleClose}
                    onSubmit={onSubmit}
                    initialValues={edit ? mapApiToProps(network) : { addSubnet: true, type: 'ipv4' }}
                    create={!edit}
                />
            </Modal.Content>
        </Modal>
    </>;
};

NetworkModal.propTypes = {
    intl: PropTypes.any,
    network: PropTypes.object,
    edit: PropTypes.bool,
    details: PropTypes.bool
};

export default injectIntl(NetworkModal);

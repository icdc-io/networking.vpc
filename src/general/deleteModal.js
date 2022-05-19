import React, { useState, useCallback } from 'react';
import { Modal, Button, Header, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
    deleteRouteActionAndFetch,
    deleteNetworkActionAndFetch,
} from '../AppActions';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { networksPath } from '../constants/routes';
import DangerousHTML from 'react-dangerous-html';

const DeleteModal = ({ t, type, instance, icon, button, history }) => {
    const routerId = useSelector(state => state.VpcStore.routerId);
    const providerId = useSelector(state => state.VpcStore.providerId);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();

    const mapPropsToApi = (item) => (
        {
            action: 'remove_route',
            ...item
        }
    );

    const types = {
        routes: {
            item: 'deleteRoute',
            header: 'deleteRouteHeader',
            content: ['deleteRouteMessage'],
            deleteAction: useCallback(
                (route) => {
                    let payload = mapPropsToApi(route);
                    dispatch(deleteRouteActionAndFetch(payload, routerId));
                },
                [dispatch, routerId]
            )
        },
        networks: {
            item: 'deleteVps',
            header: 'deleteVpsHeader',
            content: ['deleteVpsDesc'],
            contentNamed: <DangerousHTML html={t('deleteVpsMessage', { name: `<b>${instance.name}</b>` })} />,
            deleteAction: useCallback(
                (network) => {
                    const netId = network.netId;
                    dispatch(deleteNetworkActionAndFetch({ action: 'delete', id: netId }, providerId));
                    button && history.push(networksPath());
                },
                [dispatch, providerId, button, history]
            )
        }
    };

    const showModal = () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    const onConfirm = () => {
        closeModal();
        types[type].deleteAction(instance);
    };

    const modalText = (modalContent, textOptions) => modalContent.map((text, index) =>
        <Modal.Description as='p' content={t(text, textOptions)} key={index} />);

    const modalTextWithName = (modalContent) => <Modal.Description as='p' content={t(modalContent[0], modalContent[1])} />;

    const hasAssignedVms = type === 'networks' && instance.assignedVms && instance.assignedVms.length > 0;

    const buttonModal = button ?
        <Button
            onClick={showModal}
            basic size='tiny' color='red'
            content={t(types[type].item)}
            className='delete'
            disabled={hasAssignedVms}
        /> :
        icon ?
            <Icon name="trash alternate outline" onClick={showModal} />
            :
            <Dropdown.Item onClick={showModal} className='delete'>{t(types[type].item)}</Dropdown.Item>;

    return (
        window.insights.getRole() === 'admin' && <>
            {buttonModal}
            <Modal open={isVisible} size='mini' onClick={closeModal} closeIcon>
                <Header as='h3' content={t(types[type].header)} />
                <Modal.Content content={modalText(types[type].content, types[type].textOptions || {})} />
                {types[type].contentNamed && <Modal.Content content={modalTextWithName(types[type].contentNamed)} />}
                <Modal.Actions align='center'>
                    <Button onClick={closeModal} content={t('cancel')} />
                    <Button
                        color='red'
                        type='submit'
                        onClick={onConfirm}
                        content={t(type === 'networks' ? 'delete' : 'confirm')}
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
};

DeleteModal.propTypes = {
    t: PropTypes.func,
    type: PropTypes.string,
    instance: PropTypes.object,
    button: PropTypes.bool,
    icon: PropTypes.bool,
    history: PropTypes.object
};

export default withRouter(DeleteModal);

import React, { useState, useCallback } from 'react';
import { injectIntl } from 'react-intl';
import { Modal, Button, Header, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import messages from '../Messages';
import {
    deleteRouteActionAndFetch,
    deleteNetworkActionAndFetch,
} from '../AppActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { networksPath } from '../constants/routes';

const DeleteModal = ({ type, instance, intl, icon, button, history }) => {
    const routerId = useSelector(state => state.VpcStore.routerId);
    const providerId = useSelector(state => state.VpcStore.providerId);
    const { menuGroup } = useParams();
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
            item: messages.deleteRoute,
            header: messages.deleteRouteHeader,
            content: [messages.deleteRouteMessage],
            deleteAction: useCallback(
                (route) => {
                    let payload = mapPropsToApi(route);
                    dispatch(deleteRouteActionAndFetch(payload, routerId));
                },
                [dispatch, routerId]
            )
        },
        networks: {
            item: messages.deleteVps,
            header: messages.deleteVpsHeader,
            content: [messages.deleteVpsDesc],
            contentNamed: [messages.deleteVpsMessage, { name: <b>{instance.name}</b> }],
            deleteAction: useCallback(
                (network) => {
                    const netId = network.netId;
                    dispatch(deleteNetworkActionAndFetch({ action: 'delete', id: netId }, providerId));
                    button && history.push(networksPath(menuGroup));
                },
                [dispatch, providerId, button, history, menuGroup]
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
        <Modal.Description as='p' content={intl.formatMessage(text, textOptions)} key={index} />);

    const modalTextWithName = (modalContent) => <Modal.Description as='p' content={intl.formatMessage(modalContent[0], modalContent[1])} />;

    const hasAssignedVms = type === 'networks' && instance.assignedVms && instance.assignedVms.length > 0;

    const buttonModal = button ?
        <Button
            onClick={showModal}
            basic size='tiny' color='red'
            content={intl.formatMessage(types[type].item)}
            className='delete'
            disabled={hasAssignedVms}
        /> :
        icon ?
            <Icon name="trash alternate outline" onClick={showModal} />
            :
            <Dropdown.Item onClick={showModal} className='delete'>{intl.formatMessage(types[type].item)}</Dropdown.Item>;

    return (
        window.insights.getRole() === 'admin' && <>
            {buttonModal}
            <Modal open={isVisible} size='mini' onClick={closeModal} closeIcon>
                <Header as='h3' content={intl.formatMessage(types[type].header)} />
                <Modal.Content content={modalText(types[type].content, types[type].textOptions || {})} />
                {types[type].contentNamed && <Modal.Content content={modalTextWithName(types[type].contentNamed)} />}
                <Modal.Actions align='center'>
                    <Button onClick={closeModal} content={intl.formatMessage(messages.cancel)} />
                    <Button
                        color='red'
                        type='submit'
                        onClick={onConfirm}
                        content={intl.formatMessage(type === 'networks' ? messages.delete : messages.confirm)}
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
};

DeleteModal.propTypes = {
    type: PropTypes.string,
    instance: PropTypes.object,
    intl: PropTypes.any,
    button: PropTypes.bool,
    icon: PropTypes.bool,
    history: PropTypes.object
};

export default injectIntl(withRouter(DeleteModal));

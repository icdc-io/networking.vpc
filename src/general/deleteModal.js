import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import DangerousHTML from "react-dangerous-html";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Header, Icon, Modal } from "semantic-ui-react";
import {
  deleteNetworkActionAndFetch,
  deleteRouteActionAndFetch,
} from "../AppActions";
import { networksPath } from "../constants/routes";

const DeleteModal = ({ type, instance, icon, button }) => {
  const { t } = useTranslation();
  const routerId = useSelector((state) => state.VpcStore.routerId);
  const providerId = useSelector((state) => state.VpcStore.providerId);
  const user = useSelector((state) => state.host.user);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mapPropsToApi = (item) => ({
    action: "remove_route",
    ...item,
  });

  const types = {
    routes: {
      item: "deleteRoute",
      header: "deleteRouteHeader",
      content: ["deleteRouteMessage"],
      deleteAction: useCallback(
        (route) => {
          const payload = mapPropsToApi(route);
          dispatch(deleteRouteActionAndFetch(payload, routerId));
        },
        [dispatch, routerId],
      ),
    },
    networks: {
      item: "deleteVps",
      header: "deleteVpsHeader",
      content: ["deleteVpsDesc"],
      contentNamed: (
        <DangerousHTML
          html={t("deleteVpsMessage", { name: `<b>${instance.name}</b>` })}
        />
      ),
      deleteAction: useCallback(
        (network) => {
          const netId = network.netId;
          dispatch(
            deleteNetworkActionAndFetch(
              { action: "delete", id: netId },
              providerId,
            ),
          );
          button && navigate(networksPath());
        },
        [dispatch, providerId, button, navigate],
      ),
    },
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

  const modalText = (modalContent, textOptions) =>
    modalContent.map((text, index) => (
      <Modal.Description as="p" content={t(text, textOptions)} key={index} />
    ));

  const modalTextWithName = (modalContent) => (
    <Modal.Description as="p" content={t(modalContent[0], modalContent[1])} />
  );

  const hasAssignedVms =
    type === "networks" &&
    instance.assignedVms &&
    instance.assignedVms.length > 0;

  const buttonModal = button ? (
    <Button
      onClick={showModal}
      basic
      size="tiny"
      color="red"
      content={t(types[type].item)}
      className="delete"
      disabled={hasAssignedVms}
    />
  ) : icon ? (
    <Icon name="trash alternate outline" onClick={showModal} />
  ) : (
    <Dropdown.Item onClick={showModal} className="delete">
      {t(types[type].item)}
    </Dropdown.Item>
  );

  return (
    user.role === "admin" && (
      <>
        {buttonModal}
        <Modal open={isVisible} size="mini" onClick={closeModal} closeIcon>
          <Header as="h3" content={t(types[type].header)} />
          <Modal.Content
            content={modalText(
              types[type].content,
              types[type].textOptions || {},
            )}
          />
          {types[type].contentNamed && (
            <Modal.Content
              content={modalTextWithName(types[type].contentNamed)}
            />
          )}
          <Modal.Actions align="center">
            <Button onClick={closeModal} content={t("cancel")} />
            <Button
              color="red"
              type="submit"
              onClick={onConfirm}
              content={t(type === "networks" ? "delete" : "confirm")}
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  );
};

DeleteModal.propTypes = {
  type: PropTypes.string,
  instance: PropTypes.object,
  button: PropTypes.bool,
  icon: PropTypes.bool,
};

export default DeleteModal;

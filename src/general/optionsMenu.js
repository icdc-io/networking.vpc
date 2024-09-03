import PropTypes from "prop-types";
/* eslint-disable react/display-name */
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import NetworkModal from "../components/Networks/networkModal";
import RouteModal from "../components/Routes/routeModal";
import DeleteModal from "./deleteModal";

const OptionsMenu = ({ type, instance, options }) => {
  const { t } = useTranslation();
  const actions = {
    networks: {
      edit: (network, key) => <NetworkModal key={key} edit network={network} />,
      view: (network, key) => (
        <Link key={key} role="option" className="item" to={`${network.id}`}>
          {/* TODO: onclick action */}
          <Dropdown.Item text={t("viewVmNics")} onClick={() => {}} />
        </Link>
      ),
      delete: (network, key) => (
        <DeleteModal key={key} type={type} instance={network} />
      ),
    },
    routes: {
      edit: (route, key) => <RouteModal key={key} edit route={route} />,
      delete: (route, key) => (
        <DeleteModal key={key} type={type} instance={route} />
      ),
    },
  };

  return (
    <Dropdown
      direction="left"
      icon="ellipsis vertical"
      className="users-list__actions_dot"
    >
      <Dropdown.Menu>
        {options.map((option, key) => actions[type][option](instance, key))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

OptionsMenu.propTypes = {
  instance: PropTypes.object,
  type: PropTypes.string,
  options: PropTypes.array,
};

export default OptionsMenu;

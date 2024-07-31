import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const TabsLayout = ({ menuItems }) => {
  const fullUrlPath = useLocation();
  const { pathname } = fullUrlPath;

  return (
    <Menu attached="top" tabular>
      {menuItems.map((item, key) => (
        <Menu.Item
          key={key}
          name={item.name}
          active={pathname.includes(item.path)}
        >
          <Link to={item.path} className="link">
            {item.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

TabsLayout.propTypes = {
  menuItems: PropTypes.array,
};

export default TabsLayout;

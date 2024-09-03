import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Table } from "semantic-ui-react";
import OptionsMenu from "../../general/optionsMenu";
import TableHeader from "../../general/tableHeader";
import Route from "../../static/route.svg";
import { copyInfo } from "../../utilities/copyInfo";
import { onSearch } from "../../utilities/search";

const RoutesList = ({ items, search }) => {
  const { t } = useTranslation();
  const [filteredData, setFilteredData] = useState([]);
  const headers = ["subnet", "gateway", "type", "", ""];
  const user = useSelector((state) => state.host.user);

  useEffect(() => {
    setFilteredData(onSearch(items, search));
  }, [search, items]);

  const routeList = filteredData.map((route, i) => {
    return (
      <Table.Row key={i}>
        <Table.Cell className="name-with-image-wrapper">
          <img src={Route} alt="Route" />
          <div>
            {route.destination} {copyInfo(route.destination)}
          </div>
        </Table.Cell>
        <Table.Cell>
          {route.nexthop} {copyInfo(route.nexthop)}
        </Table.Cell>
        <Table.Cell>{"IPv4"}</Table.Cell>
        <Table.Cell textAlign="center" />
        <Table.Cell collapsing textAlign="right">
          {user.role === "admin" && (
            <OptionsMenu type="routes" instance={route} options={["delete"]} />
          )}
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      <div className="table-container">
        <Table unstackable basic="very">
          <TableHeader headers={headers} />
          <Table.Body>{routeList}</Table.Body>
        </Table>
      </div>
      {search && filteredData.length === 0 && (
        <div className="empty-table">{t("noSearchResults")}</div>
      )}
    </>
  );
};

RoutesList.propTypes = {
  items: PropTypes.array,
  search: PropTypes.string,
};

export default RoutesList;

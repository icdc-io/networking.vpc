import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import { copyInfo } from "../../utilities/copyInfo";
import TableHeader from "../../general/tableHeader";
import OptionsMenu from "../../general/optionsMenu";
import Route from "../../static/route.svg";
import { useSelector } from "react-redux";
import { onSearch } from "../../utilities/search";
import { useTranslation } from "react-i18next";

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
          <img src={Route} />
          <div>
            {route.destination} {copyInfo(route.destination)}
          </div>
        </Table.Cell>
        <Table.Cell>
          {route.nexthop} {copyInfo(route.nexthop)}
        </Table.Cell>
        <Table.Cell>{"IPv4"}</Table.Cell>
        <Table.Cell textAlign="center"></Table.Cell>
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

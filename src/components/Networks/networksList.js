import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Network from "../../static/svgNetwork.svg";
import Loading from "../../static/spinner.gif";
import { copyInfo } from "../../utilities/copyInfo";
import OptionsMenu from "../../general/optionsMenu";
import { useSelector } from "react-redux";
import { onSearch } from "../../utilities/search";
import { useTranslation } from "react-i18next";

const NetworksList = ({ items, search }) => {
  const { t } = useTranslation();
  const [filteredData, setFilteredData] = useState([]);
  const user = useSelector((state) => state.host.user);

  useEffect(() => {
    setFilteredData(onSearch(items[1], search));
  }, [search, items]);

  const emptyValue = String.fromCharCode(8212);
  const returnAsignedVM = (item) => {
    let vm = items[0].find((vm) => vm && item && vm.netId === item.netId);
    return vm ? vm.vmsCount : 0;
  };

  const tableHeader = ["name", "subnet", "type", "dns", "assignedVmNics", ""];

  const tableHeaderCells = tableHeader.map((header, key) => (
    <Table.Cell key={key} style={{ borderBottom: "1px solid #D1D1D1" }}>
      <b>{t(header)}</b>
    </Table.Cell>
  ));

  const networkList = filteredData.map((network, index) => {
    // const options = !returnAsignedVM(network) ? ['edit', 'delete'] : ['edit', 'view'];
    if (network) {
      const options = !returnAsignedVM(network) ? ["delete"] : ["view"];
      return (
        <Table.Row key={index}>
          <Table.Cell>
            <div className="name-with-image-wrapper">
              <img src={network.isLoading ? Loading : Network} />
              <div>
                {network.id ? (
                  <Link to={`${network.id}`}>{network.fullName}</Link>
                ) : (
                  network.name
                )}
                <p>{network.name}</p>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            {network.subnet || emptyValue}
            {network.subnet && copyInfo(network.subnet)}
          </Table.Cell>
          <Table.Cell>{network.type || emptyValue}</Table.Cell>
          <Table.Cell>
            {network.dns || emptyValue}
            {network.dns && copyInfo(network.dns)}
          </Table.Cell>
          <Table.Cell>
            {!returnAsignedVM(network) ? (
              returnAsignedVM(network)
            ) : (
              <Link to={`${network.id}`}>{returnAsignedVM(network)}</Link>
            )}
          </Table.Cell>
          <Table.Cell collapsing textAlign="right">
            {((user.role === "admin" || returnAsignedVM(network)) && (
              <OptionsMenu
                type="networks"
                instance={network}
                options={options}
              />
            )) ||
              ""}
          </Table.Cell>
        </Table.Row>
      );
    }
  });

  return (
    <>
      <div className="table-container">
        <Table unstackable basic="very">
          <Table.Header>
            <Table.Row>{tableHeaderCells}</Table.Row>
          </Table.Header>
          <Table.Body>{networkList}</Table.Body>
        </Table>
      </div>
      {search && filteredData.length === 0 && (
        <div className="empty-table">{t("noSearchResults")}</div>
      )}
    </>
  );
};

NetworksList.propTypes = {
  items: PropTypes.array,
  search: PropTypes.string,
};

export default NetworksList;

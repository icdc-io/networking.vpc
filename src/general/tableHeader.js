import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Table } from "semantic-ui-react";

const TableHeader = ({ headers, colSizes }) => {
  const { t } = useTranslation();
  const tableCells = headers.map((header, index) => {
    return (
      <Table.HeaderCell key={index} width={colSizes?.[header]}>
        {header && t([header])}
      </Table.HeaderCell>
    );
  });
  return (
    <Table.Header>
      <Table.Row>{tableCells}</Table.Row>
    </Table.Header>
  );
};

TableHeader.propTypes = {
  headers: PropTypes.array,
  colSizes: PropTypes.object,
};

export default TableHeader;

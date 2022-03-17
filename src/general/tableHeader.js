import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const TableHeader = ({ t, headers, colSizes }) => {
    const tableCells = headers.map((header, index) => {
        return (
            <Table.HeaderCell
                key={index}
                width={colSizes && colSizes[header]}>
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
    t: PropTypes.func,
    headers: PropTypes.array,
    colSizes: PropTypes.object
};

export default TableHeader;

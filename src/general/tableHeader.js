import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import messages from '../Messages';
const TableHeader = ({ headers, colSizes, intl }) => {
    const tableCells = headers.map((header, index) => {
        return (
            <Table.HeaderCell
                key={index}
                width={colSizes && colSizes[header]}>
                {header && intl.formatMessage(messages[header])}
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
    intl: PropTypes.any,
    headers: PropTypes.array,
    colSizes: PropTypes.object
};

export default injectIntl(TableHeader);

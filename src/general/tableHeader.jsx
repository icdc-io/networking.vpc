import {
	TableHead,
	TableHeader as TableHeaderComponent,
	TableRow,
} from "container/Table";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const TableHeader = ({ headers, colSizes }) => {
	const { t } = useTranslation();
	const tableCells = headers.map((header, index) => {
		return (
			<TableHead key={index} width={colSizes?.[header]}>
				{header && t([header])}
			</TableHead>
		);
	});
	return (
		<TableHeaderComponent>
			<TableRow>{tableCells}</TableRow>
		</TableHeaderComponent>
	);
};

TableHeader.propTypes = {
	headers: PropTypes.array,
	colSizes: PropTypes.object,
};

export default TableHeader;

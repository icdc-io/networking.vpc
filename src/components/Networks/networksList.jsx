import CopyButton from "container/CopyButton";
import OptionsMenu from "container/OptionsMenu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "container/Table";
import { isAdminRights } from "container/roleUtils";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../../general/deleteModal";
import Loading from "../../static/spinner.gif";
import Network from "../../static/svgNetwork.svg";
import { onSearch } from "../../utilities/search";

const NetworksList = ({ items, search }) => {
	const { t } = useTranslation();
	const [filteredData, setFilteredData] = useState([]);
	const user = useSelector((state) => state.host.user);
	const deleteModalRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		setFilteredData(onSearch(items[1], search));
	}, [search, items]);

	const onDelete = (instance) => () => {
		if (deleteModalRef.current) {
			deleteModalRef.current.handleClick(instance);
		}
	};

	const toToDetails = (network) => () => navigate(`${network.id}`);

	const emptyValue = String.fromCharCode(8212);
	const returnAsignedVM = (item) => {
		const vm = items[0].find((vm) => vm && item && vm.netId === item.netId);
		return vm ? vm.vmsCount : 0;
	};

	const tableHeader = ["name", "subnet", "type", "dns", "assignedVmNics", ""];

	const tableHeaderCells = tableHeader.map((header) => (
		<TableCell key={header} style={{ borderBottom: "1px solid #D1D1D1" }}>
			<b>{t(header)}</b>
		</TableCell>
	));

	const networkList = filteredData.map((network, index) => {
		// const options = !returnAsignedVM(network) ? ['edit', 'delete'] : ['edit', 'view'];
		if (network) {
			const options = !returnAsignedVM(network)
				? [{ text: "delete", action: onDelete, color: "red" }]
				: [{ text: "viewVmNics", action: toToDetails }];
			return (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<TableRow key={index}>
					<TableCell>
						<div className="name-with-image-wrapper">
							<img src={network.isLoading ? Loading : Network} alt="Network" />
							<div>
								{network.id ? (
									<Link to={`${network.id}`}>{network.fullName}</Link>
								) : (
									network.name
								)}
								<p>{network.name}</p>
							</div>
						</div>
					</TableCell>
					<TableCell>
						{network.subnet ? (
							<div className="flex items-center">
								<span>{network.subnet}</span>
								&nbsp; &nbsp;
								<CopyButton content={network.subnet} />
							</div>
						) : (
							emptyValue
						)}
					</TableCell>
					<TableCell>{network.type || emptyValue}</TableCell>
					<TableCell>
						{network.dns ? (
							<div className="flex items-center">
								<span>{network.dns}</span>
								&nbsp; &nbsp;
								<CopyButton content={network.dns} />
							</div>
						) : (
							emptyValue
						)}
					</TableCell>
					<TableCell>
						{!returnAsignedVM(network) ? (
							returnAsignedVM(network)
						) : (
							<Link to={`${network.id}`}>{returnAsignedVM(network)}</Link>
						)}
					</TableCell>
					<TableCell align="right">
						{((isAdminRights(user.role) || returnAsignedVM(network)) && (
							<OptionsMenu instance={network} options={options} />
						)) ||
							""}
					</TableCell>
				</TableRow>
			);
		}
	});

	return (
		<>
			<div className="table-container">
				<Table>
					<TableHeader>
						<TableRow>{tableHeaderCells}</TableRow>
					</TableHeader>
					<TableBody>{networkList}</TableBody>
				</Table>
			</div>
			{search && filteredData.length === 0 && (
				<div className="empty-table">{t("noSearchResults")}</div>
			)}
			<DeleteModal ref={deleteModalRef} type={"networks"} />
		</>
	);
};

NetworksList.propTypes = {
	items: PropTypes.array,
	search: PropTypes.string,
};

export default NetworksList;

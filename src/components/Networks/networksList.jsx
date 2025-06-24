import CopyButton from "container/CopyButton";
import Loader from "container/Loader";
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

const NetworksList = ({ items }) => {
	const { t } = useTranslation();
	const user = useSelector((state) => state.host.user);
	const deleteModalRef = useRef();
	const navigate = useNavigate();
	const vms = useSelector((state) => state.VpcStore.assignedVms);

	const onDelete = (instance) => () => {
		if (deleteModalRef.current) {
			deleteModalRef.current.handleClick(instance);
		}
	};

	const toToDetails = (network) => () => navigate(`${network.id}`);

	const emptyValue = String.fromCharCode(8212);
	const returnAsignedVM = (item) => {
		const vm = vms.find((vm) => vm && item && vm.netId === item.netId);
		return vm ? vm.vmsCount : 0;
	};

	const networkList = items.map((network, index) => {
		// const options = !returnAsignedVM(network) ? ['edit', 'delete'] : ['edit', 'view'];
		if (network) {
			const options = !returnAsignedVM(network)
				? [{ text: "delete", action: onDelete, color: "red" }]
				: [{ text: "viewVmNics", action: toToDetails }];
			return (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<TableRow key={index}>
					<TableCell>
						<div className="name-with-image-wrapper gap-2">
							{network.isLoading ? (
								<div className="loader-container">
									<Loader variant="fixed" />
								</div>
							) : (
								<img src={Network} height={45} width={45} alt="Network" />
							)}
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
			{networkList}
			<DeleteModal ref={deleteModalRef} type={"networks"} />
		</>
	);
};

NetworksList.propTypes = {
	items: PropTypes.array,
	search: PropTypes.string,
};

export default NetworksList;

import { isAdminRights } from "container/roleUtils";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
	Checkbox,
	Grid,
	Header,
	Icon,
	Input,
	Pagination,
	Table,
} from "semantic-ui-react";
import { cloudSubnetsUrl } from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
import TableHeader from "../../general/tableHeader";
import { copyInfo } from "../../utilities/copyInfo";
import { onSearch } from "../../utilities/search";
import VpcApiButton from "../VpcApiButton";
import AssignVmModal from "./assignVmModal";

const ReturnVmTable = ({
	modal,
	vmInterfaces,
	checked,
	toggle,
	showModalButton,
	onModalSubmit,
	onDelete,
	disabledList,
	group,
}) => {
	const { t } = useTranslation();
	const [search, setSearch] = useState("");
	const [result, setResult] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [oldActivePage, setoldActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [paginationMass, setPaginationMass] = useState([]);
	const user = useSelector((state) => state.host.user);
	const unassignedVmsFetchStatus = useSelector(
		(state) => state.VpcStore.unassignedVmsFetchStatus,
	);

	const getPaginationMass = () => {
		let paginationMassVar = [];
		if (activePage === totalPages) {
			paginationMassVar = result.slice(
				(activePage - 1) * 10,
				result.length + 1,
			);
			setPaginationMass(paginationMassVar);
		} else {
			paginationMassVar = result.slice((activePage - 1) * 10, activePage * 10);
			setPaginationMass(paginationMassVar);
		}
	};

	const onChange = (e) => {
		setSearch(e.currentTarget.value);
	};

	const pageChange = (_e, { activePage }) => {
		setActivePage(activePage);
		setoldActivePage(activePage);
	};

	useEffect(() => {
		if (vmInterfaces) {
			setResult(vmInterfaces);
			setTotalPages(Math.ceil(vmInterfaces.length / 10));
			getPaginationMass();
		}
	}, [vmInterfaces]);

	useEffect(() => {
		paginationMass.length < 1 && setActivePage(1);
	}, [paginationMass]);

	useEffect(() => {
		setResult(onSearch(vmInterfaces, search));
	}, [search, activePage, totalPages]);

	useEffect(() => {
		if (activePage !== oldActivePage && search === "") {
			setActivePage(oldActivePage);
		} else {
			setActivePage(1);
		}
	}, [search]);

	useEffect(() => {
		if (result) {
			setTotalPages(Math.ceil(result.length / 10));
			getPaginationMass();
		}
	}, [result, activePage, totalPages]);

	const nameCells = modal
		? ["serviceName", "owner", "vmName", "vmId"]
		: ["nic", "serviceName", "owner", "vmName", "uuid", "mac", "ip"];

	modal && nameCells.splice(7);
	const headers = nameCells.slice(0);
	modal ? headers.unshift("") && headers.push("") : headers.push("", "");

	const vmInterfacesCell = (vmInterface) => {
		const vmInterfacesCell = nameCells.map((nameCell, index) => {
			const currentVmInterface = vmInterface[nameCell];
			switch (nameCell) {
				case "mac":
				case "ip":
					return (
						<Table.Cell key={index} style={{ textAlign: "left" }}>
							{currentVmInterface || String.fromCharCode(8212)}
							{copyInfo(currentVmInterface)}
						</Table.Cell>
					);
				default:
					return (
						<Table.Cell key={index} style={{ textAlign: "left" }}>
							{currentVmInterface || String.fromCharCode(8212)}
						</Table.Cell>
					);
			}
		});

		vmInterfacesCell.push(<Table.Cell />);

		modal
			? vmInterfacesCell.unshift(
					<Table.Cell key={vmInterface.vmId}>
						<Checkbox
							onChange={toggle(vmInterface.vmId)}
							checked={checked[vmInterface.vmId]}
							disabled={disabledList[vmInterface.vmId]}
						/>
					</Table.Cell>,
				)
			: vmInterfacesCell.push(
					<Table.Cell key={vmInterfacesCell.length + 1}>
						<VpcApiButton
							filterActions={["TOKEN", "CREATE", "DELETE"]}
							info={apiButtonInfo.vmNetworkTable(vmInterface)}
							url={cloudSubnetsUrl(group?.id)}
						/>
					</Table.Cell>,
					isAdminRights(user.role) && (
						<Table.Cell
							key={vmInterfacesCell.length + 2}
							style={{ textAlign: "center" }}
						>
							{onDelete && (
								<Icon
									onClick={() => {
										onDelete(vmInterface.nicId, vmInterface.vmId);
									}}
									name="trash alternate"
									disabled={unassignedVmsFetchStatus === "pending"}
								/>
							)}
						</Table.Cell>
					),
				);

		return vmInterfacesCell;
	};

	const vmInterfacesRow = paginationMass?.map((vmInterface, index) => (
		// eslint-disable-next-line max-len
		<Table.Row
			className={(disabledList?.[vmInterface.uuid] && "disabled-nic") || ""}
			key={index}
		>
			{vmInterfacesCell(vmInterface)}
		</Table.Row>
	));

	return (
		<>
			{modal ? (
				<Header as="h4">
					[{vmInterfaces.length}] {t("availableVMs")}
				</Header>
			) : (
				<Header as="h4">
					{t("assignedVm")} ({vmInterfaces.length})
				</Header>
			)}
			{!modal && (
				<Grid.Row>
					<Grid.Column verticalAlign="middle" width={8}>
						<Input
							value={search}
							onChange={onChange}
							icon="search"
							placeholder={t("search")}
							disabled={vmInterfaces.length === 0}
						/>
					</Grid.Column>
					{showModalButton && (
						<Grid.Column textAlign="right" width={8}>
							<AssignVmModal
								submitAction={onModalSubmit}
								vmAssignedData={paginationMass}
							/>
						</Grid.Column>
					)}
				</Grid.Row>
			)}
			<div className="table-container">
				<Table unstackable className="item-list">
					<TableHeader headers={headers} />
					<Table.Body>{vmInterfacesRow}</Table.Body>
				</Table>
			</div>
			{vmInterfaces.length > 9 && (
				<Grid.Row className={modal && "pagination__vm-modal"}>
					<Pagination
						pointing
						secondary
						lastItem={null}
						firstItem={null}
						activePage={activePage}
						totalPages={totalPages}
						onPageChange={pageChange}
					/>
				</Grid.Row>
			)}
			{vmInterfaces.length === 0 && (
				<Grid.Row className="pagination__novm">
					<Grid.Column className="novm-text">{t("noAssignedVM")}</Grid.Column>
				</Grid.Row>
			)}
		</>
	);
};

ReturnVmTable.propTypes = {
	vmInterfaces: PropTypes.array,
	modal: PropTypes.bool,
	checked: PropTypes.any,
	toggle: PropTypes.func,
	showModalButton: PropTypes.bool,
	onModalSubmit: PropTypes.func,
	onDelete: PropTypes.func,
	disabledList: PropTypes.any,
	group: PropTypes.object,
};

export default ReturnVmTable;

import { Checkbox } from "container/Checkbox";
import CopyButton from "container/CopyButton";
import { Input } from "container/Input";
import Paginator from "container/Paginator";
import { isAdminRights } from "container/roleUtils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "container/Table";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { cloudSubnetsUrl } from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
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
	isActive,
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

	const pageChange = (activePage) => {
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
						<TableCell key={index} style={{ textAlign: "left" }}>
							<div className="flex gap-2 items-center">
								{currentVmInterface || String.fromCharCode(8212)}
								<CopyButton content={currentVmInterface} />
							</div>
						</TableCell>
					);
				default:
					return (
						<TableCell key={index} style={{ textAlign: "left" }}>
							{currentVmInterface || String.fromCharCode(8212)}
						</TableCell>
					);
			}
		});

		vmInterfacesCell.push(<TableCell />);

		modal
			? vmInterfacesCell.unshift(
					<TableCell key={vmInterface.vmId}>
						<Checkbox
							checked={checked[vmInterface.vmId]}
							onCheckedChange={toggle(vmInterface.vmId)}
							disabled={disabledList[vmInterface.vmId]}
						/>
					</TableCell>,
				)
			: vmInterfacesCell.push(
					<TableCell key={vmInterfacesCell.length + 1}>
						<VpcApiButton
							filterActions={["TOKEN", "CREATE", "DELETE"]}
							info={apiButtonInfo.vmNetworkTable(vmInterface)}
							url={cloudSubnetsUrl(group?.id)}
						/>
					</TableCell>,
					isAdminRights(user.role) && (
						<TableCell
							key={vmInterfacesCell.length + 2}
							style={{ textAlign: "center" }}
						>
							{onDelete && (
								<button
									type="button"
									onClick={() => {
										onDelete(vmInterface.nicId, vmInterface.vmId);
									}}
									disabled={unassignedVmsFetchStatus === "pending"}
								>
									<Trash2 size={16} />
								</button>
							)}
						</TableCell>
					),
				);

		return vmInterfacesCell;
	};

	const vmInterfacesRow = paginationMass?.map((vmInterface, index) => (
		// eslint-disable-next-line max-len
		<TableRow
			className={(disabledList?.[vmInterface.uuid] && "disabled-nic") || ""}
			key={index}
		>
			{vmInterfacesCell(vmInterface)}
		</TableRow>
	));

	return (
		<>
			{modal ? (
				<h4 className="assign-vms-title w-full mx-4">
					[{vmInterfaces.length}] {t("availableVMs")}
				</h4>
			) : (
				<h4 className="assign-vms-title mt-8 w-full">
					{t("assignedVm")} ({vmInterfaces.length})
				</h4>
			)}
			{!modal && (
				<div className="flex gap-2 items-center justify-between w-full mx-4">
					<div>
						<Input
							value={search}
							onChange={onChange}
							variant="search"
							placeholder={t("search")}
							disabled={vmInterfaces.length === 0}
						/>
					</div>
					{showModalButton && (
						<div>
							<AssignVmModal
								submitAction={onModalSubmit}
								vmAssignedData={paginationMass}
								isActive={isActive}
							/>
						</div>
					)}
				</div>
			)}
			<div className="table-container">
				<Table className="item-list">
					<TableHeader>
						<TableRow>
							{headers.map((header, index) => (
								<TableHead key={index}>{t(header)}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{vmInterfaces.length === 0 ? (
							<TableRow>
								<TableCell colSpan={100}>
									<div className="row pagination__novm">
										<div className="novm-text">{t("noAssignedVM")}</div>
									</div>
								</TableCell>
							</TableRow>
						) : (
							vmInterfacesRow
						)}
					</TableBody>
				</Table>
			</div>
			{vmInterfaces.length > 9 && (
				<div className={"mx-4 w-full"}>
					<Paginator
						currentPage={activePage}
						totalPages={totalPages}
						onPageChange={pageChange}
					/>
				</div>
			)}
		</>
	);
};

export default ReturnVmTable;

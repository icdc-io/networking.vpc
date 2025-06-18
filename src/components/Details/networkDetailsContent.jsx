import { Button } from "container/Button";
import CopyButton from "container/CopyButton";
import { isAdminRights } from "container/roleUtils";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	assignNicsToNetworkAndFetch,
	unassignNicsFromNetworkAndFetch,
} from "../../AppActions";
import { networksUrl } from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
import DeleteModal from "../../general/deleteModal";
import Network from "../../static/svgNetwork.svg";
// import NetworkModal from "../Networks/networkModal";
import VpcApiButton from "../VpcApiButton";
import ReturnVmTable from "./returnVmTable";

const NetworkDetailsContent = ({
	items: [network, group, providerId, user],
}) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { id } = useParams();
	const deleteModalRef = useRef();

	const assignNicsAndFetch = (nics) => {
		const payload = {
			action: "additional_nics",
			// eslint-disable-next-line camelcase
			vms_ids: nics,
		};
		dispatch(assignNicsToNetworkAndFetch(payload, id));
	};

	const onDeleteModalOpen = () => {
		if (deleteModalRef.current) {
			deleteModalRef.current.handleClick(network);
		}
	};

	const deleteNicAndFetch = (nicId, vmId) => {
		const payload = {
			action: "remove_nics",
			// eslint-disable-next-line camelcase
			nics: { [vmId]: [nicId] },
		};
		dispatch(unassignNicsFromNetworkAndFetch(payload, group.id));
	};

	const hasAssignedVms = network.assignedVms && network.assignedVms.length > 0;

	return (
		<div className="network_details_content">
			<div className="row detail-items-center flex items-center gap-2">
				<div className="inline-cell-wrapper">
					<div className="name-with-image-wrapper">
						<img src={Network} alt="Network" />
						<div>{network.name}</div>
					</div>
				</div>
				<div>
					<React.Suspense fallback={null}>
						<VpcApiButton
							info={apiButtonInfo.network(network)}
							url={networksUrl(providerId)}
						/>
					</React.Suspense>
				</div>
				{/* <div>
					<NetworkModal edit details network={network} />
				</div> */}
			</div>
			<br />
			<h3>{t("netDetails")}</h3>
			<br />
			<div className="network-table">
				<span className="network-table-title">{t("subnet")}</span>
				<span className="network-table-content flex items-center">
					{network.subnet || String.fromCharCode(8212)}
					&nbsp;
					<CopyButton content={network.subnet} />
				</span>
			</div>
			<div className="network-table">
				<span className="network-table-title">{t("type")}</span>
				<span className="network-table-content flex items-center">
					{network.type || String.fromCharCode(8212)}
				</span>
			</div>
			<div className="network-table">
				<span className="network-table-title">DNS</span>
				<span className="network-table-content flex items-center">
					{network.dns || String.fromCharCode(8212)}
					&nbsp;
					<CopyButton content={network.dns} />
				</span>
			</div>
			<br />
			<ReturnVmTable
				showModalButton
				onModalSubmit={assignNicsAndFetch}
				headerMesage={t("assignedVm")}
				vmInterfaces={network?.assignedVms.map((x) => ({
					...x,
					ip: x.ipv4,
					uuid: x.vmId,
					owner: x.email,
				}))}
				group={group}
				onDelete={deleteNicAndFetch}
			/>
			<div className="network-delete">
				<div className="network-delete_desc">
					<div>
						<b>{t("delete").toUpperCase()}</b>
					</div>
					<div>{t("deleteVpsDetailsDesc")}</div>
				</div>
				<div>
					{isAdminRights(user.role) && (
						<Button
							onClick={onDeleteModalOpen}
							variant="outline"
							color="red"
							disabled={hasAssignedVms}
						>
							{t("deleteVps")}
						</Button>
					)}
				</div>
			</div>
			<DeleteModal ref={deleteModalRef} type="networks" button />
		</div>
	);
};

export default NetworkDetailsContent;

import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
	assignNicsToNetworkAndFetch,
	unassignNicsFromNetworkAndFetch,
} from "../../AppActions";
import { networksUrl } from "../../AppConstants";
import { apiButtonInfo } from "../../constants/apiButtonInfo";
import DeleteModal from "../../general/deleteModal";
import Network from "../../static/svgNetwork.svg";
import { copyInfo } from "../../utilities/copyInfo";
import NetworkModal from "../Networks/networkModal";
import VpcApiButton from "../VpcApiButton";
import ReturnVmTable from "./returnVmTable";

const NetworkDetailsContent = ({
	items: [network, group, providerId, user],
}) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { id } = useParams();

	const assignNicsAndFetch = (nics) => {
		const payload = {
			action: "additional_nics",
			// eslint-disable-next-line camelcase
			vms_ids: nics,
		};
		dispatch(assignNicsToNetworkAndFetch(payload, id));
	};

	const deleteNicAndFetch = (nicId, vmId) => {
		const payload = {
			action: "remove_nics",
			// eslint-disable-next-line camelcase
			nics: { [vmId]: [nicId] },
		};
		dispatch(unassignNicsFromNetworkAndFetch(payload, group.id));
	};

	return (
		<div className="ui grid network_details_content">
			<Grid.Row className="detail-items-center">
				<Grid.Column className="inline-cell-wrapper">
					<div className="name-with-image-wrapper">
						<img src={Network} alt="Network" />
						<div>{network.name}</div>
					</div>
				</Grid.Column>
				<Grid.Column>
					<React.Suspense fallback={null}>
						<VpcApiButton
							info={apiButtonInfo.network(network)}
							url={networksUrl(providerId)}
						/>
					</React.Suspense>
				</Grid.Column>
				<Grid.Column width={2}>
					<NetworkModal edit details network={network} />
				</Grid.Column>
			</Grid.Row>
			<h4>{t("netDetails")}</h4>
			<div className="network-table">
				<span className="network-table-title">{t("subnet")}</span>
				<span className="network-table-content">
					{network.subnet || String.fromCharCode(8212)}
					&nbsp;
					{copyInfo(network.subnet)}
				</span>
			</div>
			<div className="network-table">
				<span className="network-table-title">{t("type")}</span>
				<span className="network-table-content">
					{network.type || String.fromCharCode(8212)}
				</span>
			</div>
			<div className="network-table">
				<span className="network-table-title">DNS</span>
				<span className="network-table-content">
					{network.dns || String.fromCharCode(8212)}
					&nbsp;
					{copyInfo(network.dns)}
				</span>
			</div>
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
					<DeleteModal type="networks" button instance={network} />
				</div>
			</div>
		</div>
	);
};

NetworkDetailsContent.propTypes = {
	items: PropTypes.array,
};

export default NetworkDetailsContent;

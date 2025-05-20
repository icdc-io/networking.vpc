import { showInfoNotification } from "container/Api";
import { Button } from "container/Button";
import { Input } from "container/Input";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "container/Modal";
import PropTypes from "prop-types";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
	addTemporaryNetwork,
	createNetworkActionAndFetch,
	editNetworkActionAndFetch,
} from "../../AppActions";
// import ReturnVmTable from "../Details/returnVmTable";
import NetworkForm from "./networkForm";

const NetworkModal = ({ edit, details }, ref) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const providerId = useSelector((state) => state.VpcStore.providerId);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.host.user);

	// const mapApiToProps = (item) => ({
	// 	name: item.name,
	// 	type: "ipv4",
	// 	subnet: item.subnet,
	// 	dns: item.dns,
	// 	netId: item.netId,
	// 	emsRef: item.emsRef,
	// 	addSubnet: !!item.subnet,
	// });

	useImperativeHandle(ref, () => ({
		handleClick: (instance) => {
			// setInstance(instance);
			setOpen(true);
		},
	}));

	const mapPropsToApi = useCallback(
		(item) => {
			const network = {
				action: edit ? "edit" : "create",
				id: item.netId,
				name: item.name,
			};
			const subnet = {
				subnet: {
					cidr: item.subnet,
					ip_version: 4,
					network_protocol: item.type,
					dns_nameservers: [item.dns],
					name: item.name,
				},
			};

			return item.addSubnet ? { ...network, ...subnet } : network;
		},
		[edit],
	);

	const mapPropsToNetworkObj = (values) => {
		return {
			isLoading: true,
			name: `${user.location}_${user.account}_${values.name}`,
			subnet: values.subnet,
			type: values.type,
			dns: values.dns,
		};
	};

	const handleClose = () => {
		setOpen(false);
	};

	const createNetwork = (values, providerId) => {
		dispatch(createNetworkActionAndFetch(mapPropsToApi(values), providerId));
		dispatch(addTemporaryNetwork(mapPropsToNetworkObj(values)));
	};

	const onSubmit = (values) => {
		showInfoNotification("creatingNetwork");
		edit
			? dispatch(editNetworkActionAndFetch(mapPropsToApi(values), providerId))
			: createNetwork(values, providerId);
		handleClose();
	};

	const headerContent = edit ? t("editVps") : t("createVps");

	return (
		<>
			{/* {buttonModal} */}
			<Dialog
				open={open}
				onOpenChange={(isOpen) => {
					handleClose(isOpen);
				}}
				on
			>
				<DialogContent aria-describedby={undefined} className="">
					<DialogHeader>
						<DialogTitle>{headerContent}</DialogTitle>
					</DialogHeader>

					<NetworkForm handleClose={handleClose} onSubmit={onSubmit} />
				</DialogContent>
			</Dialog>
		</>
	);
};

NetworkModal.propTypes = {
	network: PropTypes.object,
	edit: PropTypes.bool,
	details: PropTypes.bool,
};

export default forwardRef(NetworkModal);

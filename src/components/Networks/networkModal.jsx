import { showInfoNotification } from "container/Api";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "container/Modal";
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

const NetworkModal = ({ edit }, ref) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const providerId = useSelector((state) => state.VpcStore.providerId);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.host.user);

	useImperativeHandle(ref, () => ({
		handleClick: (_instance) => {
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
		return dispatch(
			createNetworkActionAndFetch(mapPropsToApi(values), providerId),
		).then(() => {
			dispatch(addTemporaryNetwork(mapPropsToNetworkObj(values)));
		});
	};

	const onSubmit = (values) => {
		showInfoNotification("creatingNetwork");

		return (
			edit
				? dispatch(editNetworkActionAndFetch(mapPropsToApi(values), providerId))
				: createNetwork(values, providerId)
		).then(handleClose);
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
				<DialogContent
					aria-describedby={undefined}
					className="networking_vpc_modal"
				>
					<DialogHeader>
						<DialogTitle>{headerContent}</DialogTitle>
					</DialogHeader>

					<NetworkForm handleClose={handleClose} onSubmit={onSubmit} />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default forwardRef(NetworkModal);

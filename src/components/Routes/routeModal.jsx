import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "container/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createRouteActionAndFetch } from "../../AppActions";
import RouteForm from "./routeForm";

const RouteModal = (_props, ref) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const routerId = useSelector((state) => state.VpcStore.routerId);

	const dispatch = useDispatch();

	// const mapRouteToProps = (item) => ({
	// 	subnet: item.destination,
	// 	gateway: item.nexthop,
	// 	type: "IPv4",
	// });

	useImperativeHandle(ref, () => ({
		handleClick: () => {
			setOpen(true);
		},
	}));

	const mapPropsToApi = (item) => ({
		action: "add_route",
		destination: item.subnet,
		nexthop: item.gateway,
	});

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = (values) => {
		handleClose();
		const payload = mapPropsToApi(values);
		dispatch(createRouteActionAndFetch(payload, routerId));
	};

	const routeForm = (
		<RouteForm
			handleClose={handleClose}
			onSubmit={onSubmit}
			// initialValues={edit && mapRouteToProps(route)}
		/>
	);

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("createRoute")}</DialogTitle>
				</DialogHeader>
				{routeForm}
			</DialogContent>
		</Dialog>
	);
};

export default forwardRef(RouteModal);

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "container/Modal";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { createRouteActionAndFetch } from "../../AppActions";
import RouteForm from "./routeForm";

const RouteModal = (_props, ref) => {
	const { t } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();

	const { modal_open, ...initialForm } = Object.fromEntries(searchParams);
	const [open, setOpen] = useState(modal_open === "true");
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
		setSearchParams({});
	};

	const onSubmit = (values) => {
		const payload = mapPropsToApi(values);
		return dispatch(createRouteActionAndFetch(payload, routerId)).then(
			handleClose,
		);
	};

	const routeForm = (
		<RouteForm
			handleClose={handleClose}
			onSubmit={onSubmit}
			initialValues={initialForm}
		/>
	);

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="networking_vpc_modal">
				<DialogHeader>
					<DialogTitle>{t("createRoute")}</DialogTitle>
				</DialogHeader>
				{routeForm}
			</DialogContent>
		</Dialog>
	);
};

export default forwardRef(RouteModal);

import { isAdminRights } from "container/roleUtils";
import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Header, Modal } from "semantic-ui-react";
import { createRouteActionAndFetch } from "../../AppActions";
import RouteForm from "./routeForm";

const RouteModal = ({ edit, route }) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const routerId = useSelector((state) => state.VpcStore.routerId);
	const oldSubnet = edit && route.destination;
	const user = useSelector((state) => state.host.user);

	const dispatch = useDispatch();

	const mapRouteToProps = (item) => ({
		subnet: item.destination,
		gateway: item.nexthop,
		type: "IPv4",
	});

	const mapPropsToApi = (item) =>
		edit
			? {
					action: "edit_route",
					oldDestination: oldSubnet,
					newRoute: {
						destination: item.subnet,
						nexthop: item.gateway,
					},
				}
			: {
					action: "add_route",
					destination: item.subnet,
					nexthop: item.gateway,
				};

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onSubmit = useCallback(
		(values) => {
			handleClose();
			const payload = mapPropsToApi(values);
			dispatch(createRouteActionAndFetch(payload, routerId));
		},
		[handleClose, dispatch, routerId],
	);

	const headerContent = edit ? t("editRoute") : t("createRoute");

	const buttonModal = edit ? (
		<Dropdown.Item text={t("editRoute")} onClick={() => setOpen(true)} />
	) : (
		<Button onClick={() => setOpen(true)} primary>
			{t("createRoute")}
		</Button>
	);

	const routeForm = (
		<RouteForm
			handleClose={handleClose}
			onSubmit={onSubmit}
			initialValues={edit && mapRouteToProps(route)}
			edit={edit}
		/>
	);

	return (
		isAdminRights(user.role) && (
			<>
				{buttonModal}
				<Modal
					open={open}
					size={"tiny"}
					onSubmit={onSubmit}
					onClose={handleClose}
					className="networking_vpc_modal"
					closeIcon
				>
					<Header content={headerContent} onClick={handleClose} />
					<Modal.Content>{routeForm}</Modal.Content>
				</Modal>
			</>
		)
	);
};

RouteModal.propTypes = {
	edit: PropTypes.bool,
	route: PropTypes.any,
};

export default RouteModal;

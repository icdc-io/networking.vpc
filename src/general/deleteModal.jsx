import { Button } from "container/Button";
import Loader from "container/Loader";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "container/Modal";
import React, {
	useState,
	useCallback,
	useImperativeHandle,
	forwardRef,
} from "react";
import DangerousHTML from "react-dangerous-html";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	deleteNetworkActionAndFetch,
	deleteRouteActionAndFetch,
} from "../AppActions";

const DeleteModal = ({ type, button }, ref) => {
	const { t } = useTranslation();
	const routerId = useSelector((state) => state.VpcStore.routerId);
	const providerId = useSelector((state) => state.VpcStore.providerId);
	const [isVisible, setIsVisible] = useState(false);
	const [instance, setInstance] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useImperativeHandle(ref, () => ({
		handleClick: (instance) => {
			setInstance(instance);
			setIsVisible(true);
		},
	}));

	const mapPropsToApi = (item) => ({
		action: "remove_route",
		...item,
	});

	const types = {
		routes: {
			item: "deleteRoute",
			header: "deleteRouteHeader",
			content: ["deleteRouteMessage"],
			deleteAction: useCallback(
				(route) => {
					const payload = mapPropsToApi(route);
					return dispatch(deleteRouteActionAndFetch(payload, routerId));
				},
				[dispatch, routerId],
			),
		},
		networks: {
			item: "deleteVps",
			header: "deleteVpsHeader",
			content: ["deleteVpsDesc"],
			contentNamed: (
				<DangerousHTML
					html={t("deleteVpsMessage", { name: `<b>${instance.name}</b>` })}
				/>
			),
			deleteAction: useCallback(
				(network) => {
					const netId = network.netId;
					return dispatch(
						deleteNetworkActionAndFetch(
							{ action: "delete", id: netId },
							providerId,
						),
					).then(() => button && navigate(".."));
				},
				[dispatch, providerId, navigate, button],
			),
		},
	};

	const closeModal = () => {
		setIsVisible(false);
	};

	const onConfirm = () => {
		setIsDeleting(true);
		types[type]
			.deleteAction(instance)
			.then(closeModal)
			.finally(() => setIsDeleting(false));
	};

	const modalText = (modalContent, textOptions) =>
		modalContent.map((text, index) => (
			<p key={index}>{t(text, textOptions)}</p>
		));

	const modalTextWithName = (modalContent) => (
		<p>{t(modalContent[0], modalContent[1])}</p>
	);

	return (
		<Dialog open={isVisible} onOpenChange={closeModal}>
			<DialogContent className="networking_vpc_modal">
				<DialogHeader>
					<DialogTitle>{t(types[type].header)}</DialogTitle>
				</DialogHeader>
				<p>{modalText(types[type].content, types[type].textOptions || {})}</p>
				{types[type].contentNamed && (
					<p>{modalTextWithName(types[type].contentNamed)}</p>
				)}
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={closeModal} type="button" variant="secondary">
							{t("cancel")}
						</Button>
					</DialogClose>

					<Button
						type="button"
						onClick={onConfirm}
						variant="warning"
						disabled={isDeleting}
					>
						{isDeleting && (
							<span className="button-loader-container">
								<Loader variant="fixed" />
							</span>
						)}
						{t(type === "networks" ? "delete" : "confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default forwardRef(DeleteModal);

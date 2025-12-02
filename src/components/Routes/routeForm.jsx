import { useFetchData } from "container/Api";
import { Button } from "container/Button";
import { Form, useForm } from "container/Form";
import { Label } from "container/Label";
import Loader from "container/Loader";
import { DialogClose, DialogFooter } from "container/Modal";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ComboboxFormField } from "../../general/ComboboxFormField";
import { InputFormField } from "../../general/InputFormField";
import External from "../../static/external.svg";
import Gateway from "../../static/gateway.svg";
import { ip, ipWithSubnetPrefix } from "../../utilities/Validations";

const resultTemplate = ({ title, value }) => (
	<div key={value} className="gateway-option">
		<img src={Gateway} alt="Gateway icon" />
		<div>
			{title && <h4>{title}</h4>}
			{value && <p>{value}</p>}
		</div>
	</div>
);

const fieldsInfo = [
	{
		name: "subnet",
		label: "subnet",
		placeholder: "subnet",
		rules: {
			required: "required",
			validate: ipWithSubnetPrefix,
		},
	},
];

const RouteForm = ({ handleClose, onSubmit, edit, initialValues }) => {
	const { t } = useTranslation();
	const { data: gateways = [] } = useFetchData({
		endpoint: "/api/gateway/v1/ip/gateways",
		select: (gateways) =>
			gateways
				.filter((gateway) => gateway.type === "custom")
				.map((gateway) => ({
					value: gateway.ip,
					text: gateway.ip,
					title: gateway.name,
				})),
		cacheTime: 0,
		staleTime: 0,
	});
	const form = useForm({
		defaultValues: fieldsInfo.reduce(
			(acc, curr) => {
				if (!acc[curr.name]) acc[curr.name] = initialValues[curr.name] || "";
				return acc;
			},
			{ gateway: initialValues?.gateway },
		),
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const buttonContent = edit ? t("editWebRoute") : t("createWebRoute");

	const onSave = (e) => {
		setIsSubmitting(true);
		form
			.handleSubmit(onSubmit)(e)
			.then(() => setIsSubmitting(false));
	};

	return (
		<Form {...form}>
			<form onSubmit={onSave} className={"flex flex-col gap-4"}>
				<div className="field">
					<Label>
						<b>{t("type")}</b>
					</Label>
					<p>IPv4</p>
				</div>
				{fieldsInfo.map((fieldInfo) => (
					<InputFormField
						key={fieldInfo.name}
						form={form}
						fieldInfo={fieldInfo}
					/>
				))}
				<div>
					<ComboboxFormField
						fieldInfo={{
							name: "gateway",
							label: "gateway",
							options: gateways,
							placeholder: "gateway",
							formatOption: resultTemplate,
							rules: {
								required: "required",
								validate: ip,
							},
						}}
						form={form}
					/>
					<Link
						to={`../../gateways?${new URLSearchParams({ modal_open: "true", redirect_uri: "../../vpc/routes", subnet: form.getValues("subnet") })}`}
					>
						<div className="external-gateways">
							{t("addNewGateway")}&nbsp;
							<img src={External} alt="External icon" />
						</div>
					</Link>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={handleClose} type="button" variant="secondary">
							{t("cancel")}
						</Button>
					</DialogClose>

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting && (
							<span className="button-loader-container">
								<Loader variant="fixed" />
							</span>
						)}
						{buttonContent}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

RouteForm.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	onSubmit: PropTypes.func,
	edit: PropTypes.bool,
	route: PropTypes.any,
};

export default RouteForm;

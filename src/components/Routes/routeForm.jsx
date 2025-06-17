import { Button } from "container/Button";
import { Form, useForm } from "container/Form";
import { Label } from "container/Label";
import { DialogClose, DialogFooter } from "container/Modal";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { InputFormField } from "../../general/InputFormField";
import { ip, ipWithSubnetPrefix } from "../../utilities/Validations";

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
	{
		name: "gateway",
		label: "gateway",
		placeholder: "gateway",
		rules: {
			required: "required",
			validate: ip,
		},
	},
];

const RouteForm = ({ handleClose, onSubmit, edit }) => {
	const { t } = useTranslation();
	const form = useForm({
		defaultValues: fieldsInfo.reduce((acc, curr) => {
			acc[curr.name] = "";
			return acc;
		}, {}),
	});
	const buttonContent = edit ? t("editWebRoute") : t("createWebRoute");

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={"flex flex-col gap-4"}
			>
				<div className="field">
					<Label>
						<b>{t("type")}</b>
					</Label>
					<p className="ipv4">IPv4</p>
				</div>
				{fieldsInfo.map((fieldInfo) => (
					<InputFormField
						key={fieldInfo.name}
						form={form}
						fieldInfo={fieldInfo}
					/>
				))}
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={handleClose} type="button" variant="secondary">
							{t("cancel")}
						</Button>
					</DialogClose>

					<Button type="submit">{buttonContent}</Button>
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

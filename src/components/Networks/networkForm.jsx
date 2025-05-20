import { Button } from "container/Button";
import { Form, useForm } from "container/Form";
import { DialogClose, DialogFooter } from "container/Modal";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CheckboxFormField } from "../../general/CheckboxFormField";
import { InputFormField } from "../../general/InputFormField";
import {
	ip,
	ipWithSubnetPrefix,
	name,
	namePattern,
	required,
} from "../../utilities/Validations";

const fieldTypes = {
	input: InputFormField,
	checkbox: CheckboxFormField,
};

const fieldsInfo = (values = {}) => [
	{
		name: "name",
		label: "name",
		placeholder: "name",
		type: fieldTypes.input,
		rules: {
			required: "required",
			pattern: {
				value: namePattern,
				message: "nameWithSpace",
			},
		},
	},
	{
		name: "addSubnet",
		label: "addSubnet",
		type: fieldTypes.checkbox,
	},
	{
		name: "type",
		label: "type",
		placeholder: "type",
		disabled: true,
		type: fieldTypes.input,
	},
	{
		name: "subnet",
		label: "subnet",
		placeholder: "subnet",
		disabled: !values.addSubnet,
		type: fieldTypes.input,
		rules: {
			required: values.addSubnet ? "required" : undefined,
			validate: (value, values) =>
				values.addSubnet ? ipWithSubnetPrefix(value) : undefined,
		},
	},
	{
		name: "dns",
		label: "dnsIp",
		placeholder: "dns",
		disabled: !values.addSubnet,
		type: fieldTypes.input,
		rules: {
			required: values.addSubnet ? "required" : undefined,
			validate: (value, values) => (values.addSubnet ? ip(value) : undefined),
		},
	},
];

const NetworkForm = ({ handleClose, onSubmit, initialValues }) => {
	const { t } = useTranslation();
	const form = useForm({
		defaultValues: fieldsInfo().reduce(
			(acc, curr) => {
				if (!acc[curr.name]) acc[curr.name] = "";
				return acc;
			},
			{
				addSubnet: true,
				type: "ipv4",
			},
		),
	});

	const edit = !!initialValues;

	useEffect(() => {
		if (initialValues) {
			form.reset(initialValues);
		}
	}, []);

	const buttonContent = edit ? t("editNetwork") : t("create");

	const values = form.getValues();

	useEffect(() => {
		if (!values.addSubnet) {
			form.clearErrors("subnet");
			form.clearErrors("dns");
		}
	}, [values.addSubnet]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={"flex flex-col gap-4"}
			>
				{fieldsInfo(values).map((fieldInfo) => {
					const FormComponent = fieldInfo.type;
					return (
						<FormComponent
							key={fieldInfo.name}
							fieldInfo={fieldInfo}
							form={form}
						/>
					);
				})}
				<DialogFooter>
					<DialogClose asChild>
						<Button onClick={handleClose} type="button" variant="secondary">
							{t("cancel")}
						</Button>
					</DialogClose>

					<Button type="submit" disabled={!form.formState.isDirty}>
						{buttonContent}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default NetworkForm;

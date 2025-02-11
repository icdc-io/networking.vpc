import GeneralInput from "container/GeneralInput";
import composeValidators from "container/composeValidators";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "semantic-ui-react";
import CustomCheckbox from "../../general/customCheckbox";
import {
	ip,
	ipWithSubnetPrefix,
	name,
	required,
} from "../../utilities/Validations";

const NetworkForm = ({ handleClose, onSubmit, create, initialValues }) => {
	const { t } = useTranslation();

	const buttonContent = create ? t("create") : t("editNetwork");

	return (
		<Form onSubmit={onSubmit} initialValues={initialValues}>
			{({ handleSubmit, pristine, invalid, values }) => {
				const isSubmitDisabled = pristine || invalid;

				return (
					<form onSubmit={handleSubmit} className="ui form">
						<Field
							name="name"
							label={t("name")}
							component={GeneralInput}
							type="text"
							validate={composeValidators(required, name)}
						/>
						<Field
							name="addSubnet"
							label={t("addSubnet")}
							component={CustomCheckbox}
							type="checkbox"
						/>
						<Field
							name="type"
							label={t("type")}
							component={GeneralInput}
							type="text"
							validate={required}
							readOnly={true}
						/>
						<Field
							name="subnet"
							label={t("subnet")}
							component={GeneralInput}
							type="text"
							validate={(value, values) => {
								if (!values.addSubnet) return;

								return required(value) || ipWithSubnetPrefix(value);
							}}
							readOnly={!values.addSubnet}
						/>
						<Field
							name="dns"
							label={t("dnsIp")}
							component={GeneralInput}
							type="text"
							validate={(value, values) => {
								if (!values.addSubnet) return;

								return required(value) || ip(value);
							}}
							readOnly={!values.addSubnet}
						/>
						<Modal.Actions align={"right"} style={{ marginTop: "20px" }}>
							<Button onClick={handleClose}>{t("cancel")}</Button>
							<Button
								primary
								type="submit"
								disabled={isSubmitDisabled}
								content={buttonContent}
							/>
						</Modal.Actions>
					</form>
				);
			}}
		</Form>
	);
};

NetworkForm.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	onSubmit: PropTypes.func,
	create: PropTypes.bool,
	invalid: PropTypes.any,
	pristine: PropTypes.any,
	initialValues: PropTypes.any,
};

export default NetworkForm;

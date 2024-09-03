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

const GeneralInput = React.lazy(
  () => import("container/networking/GeneralInput"),
);

const NetworkForm = ({
  handleClose,
  onSubmit,
  create,
  initialValues,
  invalid,
  pristine,
}) => {
  const { t } = useTranslation();
  const [addSubnet, setAddSubnet] = useState(
    create ? true : initialValues.addSubnet,
  );

  const onAddSubnet = () => setAddSubnet(!addSubnet);

  const buttonContent = create ? t("create") : t("editNetwork");

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
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
            props={{ value: addSubnet, onClick: onAddSubnet }}
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
            validate={
              addSubnet ? composeValidators(required, ipWithSubnetPrefix) : []
            }
            readOnly={!addSubnet}
          />
          <Field
            name="dns"
            label={t("dnsIp")}
            component={GeneralInput}
            type="text"
            validate={addSubnet ? composeValidators(required, ip) : []}
            readOnly={!addSubnet}
          />
          <Modal.Actions align={"right"} style={{ marginTop: "20px" }}>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button
              primary
              type="submit"
              disabled={pristine || invalid}
              content={buttonContent}
            />
          </Modal.Actions>
        </form>
      )}
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

import composeValidators from "container/composeValidators";
import PropTypes from "prop-types";
import React from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "semantic-ui-react";
import { ip, ipWithSubnetPrefix, required } from "../../utilities/Validations";

const GeneralInput = React.lazy(
  () => import("container/networking/GeneralInput"),
);

const RouteForm = ({ handleClose, onSubmit, edit }) => {
  const { t } = useTranslation();
  const buttonContent = edit ? t("editRoute") : t("createRoute");

  return (
    <>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, invalid, pristine }) => (
          <form onSubmit={handleSubmit} className="ui form">
            <div className="field">
              <label>{t("type")}</label>
              <p className="ipv4">IPv4</p>
            </div>
            <Field
              name="subnet"
              label={t("subnet")}
              component={GeneralInput}
              type="text"
              validate={composeValidators(required, ipWithSubnetPrefix)}
            />
            <Field
              name="gateway"
              label={t("gateway")}
              component={GeneralInput}
              type="text"
              validate={composeValidators(required, ip)}
            />
            <Modal.Actions align={"right"} style={{ marginTop: "20px" }}>
              <Button onClick={handleClose} content={t("cancel")} />
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
    </>
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

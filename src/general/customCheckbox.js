import PropTypes from "prop-types";
import React from "react";
import { Checkbox } from "semantic-ui-react";

const CustomCheckbox = ({ input, label }) => {
  return (
    <Checkbox
      className="field custom_checkbox"
      label={label}
      type="checkbox"
      checked={input.checked}
      onChange={(e, { checked }) => {
        input.onChange(checked);
      }}
    />
  );
};

CustomCheckbox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

export default CustomCheckbox;

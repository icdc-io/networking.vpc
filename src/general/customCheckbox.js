import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

const CustomCheckbox = ({ input, label, onClick }) => {
    return (
        <Checkbox
            className="field"
            label={label}
            type="checkbox"
            checked={input.checked}
            onChange={(e, { checked }) => { input.onChange(checked); onClick(); }}
            style={{ marginBottom: '0px', width: '40%' }}
        />
    );
};

CustomCheckbox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    onClick: PropTypes.func
};

export default CustomCheckbox;

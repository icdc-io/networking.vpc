import React from 'react';
import { Form, Label, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const GeneralInput = ({ input, label, meta: { error, touched }, readOnly, placeholder, style, dnsType }) => {
    return (
        <Form.Field error={(touched && error) ? true : false} disabled={readOnly} style={{ marginTop: 20 }}>
            <label>{label}</label>
            <Input
                disabled={readOnly}
                {...input}
                placeholder={placeholder}
                value={input.value}
                style={style}
                label={dnsType === 'NS' && { basic: true, content: '.ns.dns' }}
                labelPosition={dnsType === 'NS' ? 'right' : null}
            />
            {touched && error && <div><Label pointing color='red' prompt>{error}</Label></div>}
        </Form.Field>
    );
};

GeneralInput.propTypes = {
    input: PropTypes.any,
    label: PropTypes.any,
    meta: PropTypes.any,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    fieldValue: PropTypes.string,
    style: PropTypes.any,
    dnsType: PropTypes.string
};

export default GeneralInput;

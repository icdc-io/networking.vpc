import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Form, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { required, name, dns, ip } from '../../utilities/Validations';
import GeneralInput from '../../general/generalInput';
import CustomCheckbox from '../../general/customCheckbox';
import messages from '../../Messages';

const NetworkForm = ({ intl, handleClose, handleSubmit, create, initialValues, invalid, pristine }) => {
    const [addSubnet, setAddSubnet] = useState(create ? true : initialValues.addSubnet);

    const onAddSubnet = () => setAddSubnet(!addSubnet);

    const buttonContent = create ? intl.formatMessage(messages.create) : intl.formatMessage(messages.editNetwork);

    return <Form>
        <Field
            name="name"
            label={intl.formatMessage(messages.name)}
            component={GeneralInput}
            type="text"
            validate={[required, name]}
        />
        <Field
            name="addSubnet"
            label={intl.formatMessage(messages.addSubnet)}
            component={CustomCheckbox}
            props={{ value: addSubnet, onClick: onAddSubnet }}
            type="checkbox"
        />
        <Field
            name="type"
            label={intl.formatMessage(messages.type)}
            component={GeneralInput}
            type="text"
            validate={[required]}
            readOnly={true}
        />
        <Field
            name="subnet"
            label={intl.formatMessage(messages.subnet)}
            component={GeneralInput}
            type="text"
            validate={addSubnet ? [required, dns] : []}
            readOnly={!addSubnet}
        />
        <Field
            name="dns"
            label={intl.formatMessage(messages.dnsIp)}
            component={GeneralInput}
            type="text"
            validate={addSubnet ? [required, ip] : []}
            readOnly={!addSubnet}
        />
        <Modal.Actions align={'right'} style={{ marginTop: '20px' }}>
            <Button onClick={handleClose}>{intl.formatMessage(messages.cancel)}</Button>
            <Button onClick={handleSubmit} primary type='submit' disabled={pristine || invalid} content={buttonContent} />
        </Modal.Actions>
    </Form>;
};

NetworkForm.propTypes = {
    intl: PropTypes.any,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    create: PropTypes.bool,
    invalid: PropTypes.any,
    pristine: PropTypes.any,
    initialValues: PropTypes.any
};

export default reduxForm({
    form: 'createNetwork'
})(injectIntl(NetworkForm));

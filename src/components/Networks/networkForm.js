import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { required, name, dns, ip } from '../../utilities/Validations';
import CustomCheckbox from '../../general/customCheckbox';
const GeneralInput = React.lazy(() => import('container/GeneralInput'));

const NetworkForm = ({ t, handleClose, handleSubmit, create, initialValues, invalid, pristine }) => {
    const [addSubnet, setAddSubnet] = useState(create ? true : initialValues.addSubnet);

    const onAddSubnet = () => setAddSubnet(!addSubnet);

    const buttonContent = create ? t('create') : t('editNetwork');

    return <Form>
        <Field
            name="name"
            label={t('name')}
            component={GeneralInput}
            type="text"
            validate={[required, name]}
        />
        <Field
            name="addSubnet"
            label={t('addSubnet')}
            component={CustomCheckbox}
            props={{ value: addSubnet, onClick: onAddSubnet }}
            type="checkbox"
        />
        <Field
            name="type"
            label={t('type')}
            component={GeneralInput}
            type="text"
            validate={[required]}
            readOnly={true}
        />
        <Field
            name="subnet"
            label={t('subnet')}
            component={GeneralInput}
            type="text"
            validate={addSubnet ? [required, dns] : []}
            readOnly={!addSubnet}
        />
        <Field
            name="dns"
            label={t('dnsIp')}
            component={GeneralInput}
            type="text"
            validate={addSubnet ? [required, ip] : []}
            readOnly={!addSubnet}
        />
        <Modal.Actions align={'right'} style={{ marginTop: '20px' }}>
            <Button onClick={handleClose}>{t('cancel')}</Button>
            <Button onClick={handleSubmit} primary type='submit' disabled={pristine || invalid} content={buttonContent} />
        </Modal.Actions>
    </Form>;
};

NetworkForm.propTypes = {
    t: PropTypes.func,
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
})(NetworkForm);

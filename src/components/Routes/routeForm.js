import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Form, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { required, dns, ip } from '../../utilities/Validations';
import GeneralInput from '../../general/generalInput';
import messages from '../../Messages';

const RouteForm = ({ handleClose, handleSubmit, edit, intl, invalid, pristine }) => {
    const buttonContent = edit ? intl.formatMessage(messages.editRoute) : intl.formatMessage(messages.createRoute);

    return <>
        <Form>
            <div className='field'>
                <label>{intl.formatMessage(messages.type)}</label>
                <p className='ipv4'>IPv4</p>
            </div>
            <Field
                name='subnet'
                label={intl.formatMessage(messages.subnet)}
                component={GeneralInput}
                type='text'
                validate={[required, dns]}
            />
            <Field
                name='gateway'
                label={intl.formatMessage(messages.gateway)}
                component={GeneralInput}
                type='text'
                validate={[required, ip]}
            />
            <Modal.Actions align={'right'} style={{ marginTop: '20px' }}>
                <Button onClick={handleClose} content={intl.formatMessage(messages.cancel)}/>
                <Button onClick={handleSubmit} primary type='submit' disabled={pristine || invalid} content={buttonContent}/>
            </Modal.Actions>
        </Form>
    </>;
};

RouteForm.propTypes = {
    intl: PropTypes.any,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    edit: PropTypes.bool,
    route: PropTypes.any,
    invalid: PropTypes.any,
    pristine: PropTypes.any
};

export default reduxForm({
    form: 'createRoute'
})(injectIntl(RouteForm));

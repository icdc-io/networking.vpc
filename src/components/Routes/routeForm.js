import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { required, ip, ipWithSubnetPrefix } from '../../utilities/Validations';

const GeneralInput = React.lazy(() => import('container/GeneralInput'));

const RouteForm = ({ t, handleClose, handleSubmit, edit, invalid, pristine }) => {
    const buttonContent = edit ? t('editRoute') : t('createRoute');

    return <>
        <Form>
            <div className='field'>
                <label>{t('type')}</label>
                <p className='ipv4'>IPv4</p>
            </div>
            <Field
                name='subnet'
                label={t('subnet')}
                component={GeneralInput}
                type='text'
                validate={[required, ipWithSubnetPrefix]}
            />
            <Field
                name='gateway'
                label={t('gateway')}
                component={GeneralInput}
                type='text'
                validate={[required, ip]}
            />
            <Modal.Actions align={'right'} style={{ marginTop: '20px' }}>
                <Button onClick={handleClose} content={t('cancel')}/>
                <Button onClick={handleSubmit} primary type='submit' disabled={pristine || invalid} content={buttonContent}/>
            </Modal.Actions>
        </Form>
    </>;
};

RouteForm.propTypes = {
    t: PropTypes.func,
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
})(RouteForm);

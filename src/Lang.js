/* eslint-disable no-console */
import React from 'react';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import messages from '../locales/data';
import { useSelector } from 'react-redux';

const Lang = (props) => {
    const lang = useSelector(state => state?.host?.lang || 'en');

    return (
        <IntlProvider
            locale={lang}
            messages={messages[lang]}
            onError={console.log}
            {...props}
        />
    );
};

export default Lang;

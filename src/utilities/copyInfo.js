import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

export const copyInfo = (value) => {
    return value ? (
        <Popup content='Copied!' on='click' pinned
            trigger={
                <button id="gateway" className="reset-button" onClick={() => navigator.clipboard.writeText(value)}>
                    <Icon name='copy outline' />
                </button>
            }
        />
    ) : null;
};

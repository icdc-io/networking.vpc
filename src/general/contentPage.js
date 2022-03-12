import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import messages from '../Messages';
import ItemHeader from './itemHeader';
import NoContent from './noContent';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const ContentPage = ({
    status,
    pageData,
    title,
    noContentMessage,
    noContentComponent,
    noContentComponentProps,
    componentDataList,
    componentModal,
    children,
    isTabbedView
    /* Note: isTabbedView is a boolean value that determines if a page will have menu tabs on the top,
    depending on the value the layout of the title header will change */
}) => {
    const checkStatus = () => {
        if (status === 'pending' && pageData?.length === 0) { return 'loader'; }

        if (status === 'rejected') { return 'error'; }

        if (pageData?.length > 0) { return 'content'; }
    };

    const content = React.createElement(componentDataList, { items: pageData });

    const contentPage = () => {
        /* eslint-disable */
        switch (checkStatus()) {
            case 'loader':
                return <Loader active inline='centered' />;
            case 'error':
                return <NoContent icon='desktop' textMessage={messages.wrong} />;
            case 'content':
                return content;
            default:
                return noContentComponent ? React.createElement(noContentComponent, noContentComponentProps) :
                    <NoContent icon="meh" textMessage={noContentMessage} />;
        }
        /* eslint-enable */
    };

    return <>
        <Grid>
            {children || (
                <Grid.Row className="content-page__header">
                    <ItemHeader title={title} isTabbedView={isTabbedView} />
                    <Grid.Column textAlign='right' width={12}>
                        {componentModal && React.createElement(componentModal)}
                    </Grid.Column>
                </Grid.Row>
            )}
        </Grid>
        {contentPage()}
    </>;
};

ContentPage.propTypes = {
    status: PropTypes.string,
    pageData: PropTypes.array,
    title: PropTypes.any,
    noContentMessage: PropTypes.any,
    noContentComponent: PropTypes.any,
    componentDataList: PropTypes.any,
    componentModal: PropTypes.any,
    noContentComponentProps: PropTypes.any,
    children: PropTypes.any,
    isTabbedView: PropTypes.bool
};

export default injectIntl(ContentPage);

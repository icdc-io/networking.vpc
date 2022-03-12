import React from 'react';
import CodeSnippetOption from './CodeSnippetOption';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

const CodeSnippetOptions = ({ tabs, navTitle, activeItem, setActiveItem }) => {

    const handleClick = (event) => {
        const item = event.target.name;
        setActiveItem({ ...activeItem, [navTitle.toLowerCase()]: item });
    };

    return (
        <div className='navigation' style={navTitle === 'Tool' ? { marginLeft: '20px' } : {}}>
            <Header as='h5' color='grey' className='title'>{navTitle}</Header>
            <div style={{ display: 'flex' }}>
                {tabs.map((item, key) => (
                    <CodeSnippetOption
                        name={item}
                        key={key}
                        active={activeItem.action === item || activeItem.tool === item}
                        handleClick={handleClick}
                    />
                ))}
            </div>
        </div >
    );
};

CodeSnippetOptions.propTypes = {
    tabs: PropTypes.array,
    navTitle: PropTypes.string,
    activeItem: PropTypes.object,
    setActiveItem: PropTypes.func
};

export default CodeSnippetOptions;

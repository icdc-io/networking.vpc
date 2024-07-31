import React from "react";
import PropTypes from "prop-types";

const CodeSnippetOption = ({ name, active, handleClick }) => {
  return (
    <button
      className={active ? "active" : ""}
      onClick={handleClick}
      name={name}
    >
      {name}
    </button>
  );
};

CodeSnippetOption.propTypes = {
  name: PropTypes.any,
  active: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default CodeSnippetOption;

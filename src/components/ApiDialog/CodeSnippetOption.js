import PropTypes from "prop-types";
import React from "react";

const CodeSnippetOption = ({ name, active, handleClick }) => {
  return (
    <button
      type="button"
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

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const ButtonBack = ({ back, path, style = {} }) => {
	return (
		<Link style={style} to={path} replace="path">
			<Button
				className="back back__top"
				labelPosition="left"
				icon="left chevron"
				content={back}
			/>
		</Link>
	);
};

ButtonBack.propTypes = {
	back: PropTypes.string,
	path: PropTypes.string,
	style: PropTypes.object,
};

export default ButtonBack;

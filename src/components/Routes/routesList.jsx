import CopyButton from "container/CopyButton";
import OptionsMenu from "container/OptionsMenu";
import { isAdminRights } from "container/roleUtils";
import { TableCell, TableRow } from "container/Table";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "../../general/deleteModal";
import Route from "../../static/route.svg";

const RoutesList = ({ items }) => {
	const user = useSelector((state) => state.host.user);
	const deleteModalRef = useRef();

	const onDelete = (instance) => () => {
		if (deleteModalRef.current) {
			deleteModalRef.current.handleClick(instance);
		}
	};

	const options = [
		{
			text: "delete",
			action: onDelete,
			color: "red",
		},
	];

	const routeList = items.map((route, i) => {
		return (
			<TableRow key={i}>
				<TableCell className="name-with-image-wrapper gap-2">
					<img src={Route} alt="Route" />
					<div className="flex items-center gap-2">
						{route.destination}
						&nbsp;
						<CopyButton content={route.destination} />
					</div>
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-2">
						{route.nexthop}
						&nbsp;
						<CopyButton content={route.nexthop} />
					</div>
				</TableCell>
				<TableCell>{"IPv4"}</TableCell>
				<TableCell align="right">
					{isAdminRights(user.role) && (
						<OptionsMenu instance={route} options={options} />
					)}
				</TableCell>
			</TableRow>
		);
	});

	return (
		<>
			{routeList}

			<DeleteModal ref={deleteModalRef} type={"routes"} />
		</>
	);
};

RoutesList.propTypes = {
	items: PropTypes.array,
	search: PropTypes.string,
};

export default RoutesList;

import CopyButton from "container/CopyButton";
import OptionsMenu from "container/OptionsMenu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "container/Table";
import { isAdminRights } from "container/roleUtils";
import { Meh } from "lucide-react";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DeleteModal from "../../general/deleteModal";
import Route from "../../static/route.svg";
import { onSearch } from "../../utilities/search";

const RoutesList = ({ items, search }) => {
	const { t } = useTranslation();
	const [filteredData, setFilteredData] = useState([]);
	const headers = ["subnet", "gateway", "type", "", ""];
	const user = useSelector((state) => state.host.user);
	const deleteModalRef = useRef();

	useEffect(() => {
		setFilteredData(onSearch(items, search));
	}, [search, items]);

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

	const routeList = filteredData.map((route, i) => {
		return (
			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
			<TableRow key={i}>
				<TableCell className="name-with-image-wrapper">
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
				<TableCell align="center" />
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
			{filteredData.length > 0 ? (
				<div className="table-container">
					<Table>
						<TableHeader>
							<TableRow>
								{headers.map((header) => (
									<TableHead key={header}>{t(header)}</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>{routeList}</TableBody>
					</Table>
				</div>
			) : (
				<div className="noContent">
					<Meh className="m-auto" size={54} />
					<h3>{t("noRoutes")}</h3>
				</div>
			)}
			<DeleteModal ref={deleteModalRef} type={"routes"} />
		</>
	);
};

RoutesList.propTypes = {
	items: PropTypes.array,
	search: PropTypes.string,
};

export default RoutesList;

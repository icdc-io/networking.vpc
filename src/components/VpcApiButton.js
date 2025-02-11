import ApiButton, { ActionTypes } from "container/ApiButton";
import { getFullPath } from "../AppActions";

const VpcApiButton = ({ filterActions, info, url }) => {
	const fullUrl = getFullPath(url);
	const headers = [
		["x-miq-group", "%ACCOUNT.%ROLE"],
		["x-icdc-account", "%ACCOUNT"],
		["x-icdc-role", "%ROLE"],
	];
	const TOKEN = { actionType: ActionTypes.TOKEN };
	const GET = { actionType: ActionTypes.GET, headers, url: fullUrl };
	const CREATE = {
		actionType: ActionTypes.CREATE,
		headers,
		url: fullUrl,
		body: JSON.stringify(info.create),
	};
	const DELETE = {
		actionType: ActionTypes.CREATE,
		tabName: "DELETE",
		headers,
		url: fullUrl,
		body: JSON.stringify(info.delete),
	};

	const actions = [TOKEN, GET, CREATE, DELETE];

	if (!filterActions) return <ApiButton actions={actions} />;

	return (
		<ApiButton
			actions={actions.filter((action) =>
				filterActions.includes(action.actionType),
			)}
		/>
	);
};

export default VpcApiButton;

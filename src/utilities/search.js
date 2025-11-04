const setExceptions = (key) => {
	return key.includes("exception");
};

export const onSearch = (array, searchString) => {
	const temp = [];
	if (searchString !== "") {
		// biome-ignore lint/suspicious/useIterableCallbackReturn: use foreach instead of map
		array.map((item) => {
			for (const key in item) {
				if (
					item[key] &&
					typeof item[key] !== "boolean" &&
					!setExceptions(key) &&
					typeof item[key] !== "number" &&
					typeof item[key] !== "object" &&
					key !== "key" &&
					key !== "certificate" &&
					item[key].toLowerCase().includes(searchString.toLowerCase())
				) {
					temp.push(item);
					break;
				}
			}
		});
		return temp;
	}
	return array;
};

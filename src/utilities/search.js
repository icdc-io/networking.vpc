const setExceptions = (key) => {
    return key.includes('exception');
};

export const onSearch = (array, searchString) => {
    let temp = [];
    if (searchString !== '') {
        array.map((item) => {
            for (let key in item) {
                if (item[key] && typeof item[key] !== 'boolean' && !setExceptions(key) && typeof item[key] !== 'number'
				&& typeof item[key] !== 'object' && key !== 'key' && key !== 'certificate'
				&& item[key].toLowerCase().includes(searchString.toLowerCase())) {
                    temp.push(item);
                    break;
                }
            }
        });
        return temp;
    } else {
        return array;
    }
};

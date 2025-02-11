import ipRegex from "ip-regex";

const MIN_PORT = 0;
const MAX_PORT = 65535;

const validateTranslations = {
	en: {
		required: "Required",
		number: "Must be a number",
		minLength: (min) => `Must be ${min} characters or more`,
		maxLength: (max) => `Must be ${max} characters or less`,
		name: "Sorry, only Latin letters (a-z), numbers (0-9), dashes, and “_” are allowed",
		nameWithoutDotsOrAt:
			'Please, enter "@" or name constiting of latin letters (a-z), numbers (0-9), dashes, and/or underscores',
		ip: "Please enter a valid IP address",
		ipWithSubnetPrefix: "Must be a valid IP address with a prefix",
		hostname:
			"Sorry, only Latin letters (a-z), numbers (0-9), dashes, “_”, dots are allowed",
		port: "Please enter valid port",
		ttl: "Sorry, TTL must be a number",
		ipOrHostname: "Please enter a valid IP address or hostname",
		mtu: "Must be a number within the range of 1-9000",
		peerEndpoint:
			"Must be in the formats hostname:port, ipv4:port or ipv6:port",
		publicKey: "Must be a valid public key",
	},
	ru: {
		required: "Обязательно для заполнения",
		number: "Должно быть число",
		minLength: (min) => `Должно быть ${min} символов или больше`,
		maxLength: (max) => `Должно быть ${max} символов или меньше`,
		name: "Извините, разрешены только латинские буквы (a-z), цифры (0-9), тире, и «_»",
		nameWithoutDotsOrAt:
			'Введите "@" или имя, состоящее из латинских букв (a-z), цифр (0-9), дефисов, и/или «_»',
		ip: "Введите действительный IP-адресс",
		ipWithSubnetPrefix:
			"Пожалуйста, введите действительный IP-адрес с префиксом",
		hostname:
			"Извините, разрешены только латинские буквы (a-z), цифры (0-9), тире, «_» и точки",
		port: "Укажите верное значение порта",
		ttl: "Извините, TTL должен быть числом (0-9)",
		ipOrHostname: "Введите действительный IP-адреc или hostname",
		mtu: "Должно быть число в пределах 1-9000",
		peerEndpoint: "Должен быть в формате hostname:port, ipv4:port, ipv6:port",
		publicKey: "Пожалуйста, введите действительный публичный ключ",
	},
};

const getLang = () => {
	return localStorage.getItem("icdc-lang") || "en";
};

// Value can also be an array
export const required = (value) =>
	(Array.isArray(value) ? value.length : value)
		? undefined
		: validateTranslations[getLang()].required;

/**
 * Checks if the value is a number
 * @returns If it's a number then it will return undefined, if not it will return an error
 */
export const number = (value) => {
	return /^\d+$/.test(value)
		? undefined
		: validateTranslations[getLang()].number;
};

export const minLength = (min) => (value) =>
	value && value.length < min
		? validateTranslations[getLang()].minLength(min)
		: undefined;

const maxLength = (max) => (value) =>
	value && value.length > max
		? validateTranslations[getLang()].maxLength(max)
		: undefined;

export const maxLength4 = maxLength(4);

export const maxLength5 = maxLength(5);

export const maxLength15 = maxLength(15);

export const maxLength30 = maxLength(30);

export const maxLength63 = maxLength(63);

export const maxLength250 = maxLength(250);

export const maxLength256 = maxLength(256);

export const name = (value) =>
	value && !value.match(/^[a-zA-Z0-9_.-]*$/)
		? validateTranslations[getLang()].name
		: undefined;

export const nameWithoutDotsOrAt = (value) =>
	value && !value.match(/^[a-zA-Z0-9_-]*$|^@$/)
		? validateTranslations[getLang()].nameWithoutDotsOrAt
		: undefined;

export const hostname = (value) => {
	const hostnameRegex = /^[a-zA-Z0-9_.-]*$/;

	return value && !value.match(hostnameRegex)
		? validateTranslations[getLang()].hostname
		: undefined;
};

export const dns = (value) => {
	let flag = 0;
	if (
		value.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\/[0-9]{1,2}$/)
	) {
		const dnsParts = value.split(/\.|\//);
		dnsParts.forEach((num, index) => {
			const condition = (min, max) => num >= min && num <= max;
			if (
				(index < 4 && condition(0, 255)) ||
				(index === 4 && condition(0, 32))
			) {
				flag++;
			}
		});
	}

	return flag === 5 ? undefined : "DNS";
};

export const ip = (value) => {
	let flag = 0;
	if (
		typeof value === "string" &&
		value.match(/^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$/)
	) {
		const dnsParts = value.split(/\./);
		dnsParts.forEach((num) => {
			const condition = (min, max) => num >= min && num <= max;
			if (condition(0, 255)) {
				flag++;
			}
		});
	}

	return flag === 4 ? undefined : validateTranslations[getLang()].ip;
};

export const ipWithSubnetPrefix = (value) => {
	let flag = 0;
	const regexResult = value?.match(
		/^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})\/([0-9]{1,2})$/,
	);
	if (regexResult) {
		const ipValues = regexResult.slice(1, 5);
		const subnet = regexResult.slice(-1)[0];
		ipValues.forEach((value) => value >= 0 && value <= 255 && flag++);
		subnet >= 0 && subnet <= 32 && flag++;
	}

	return flag === 5
		? undefined
		: validateTranslations[getLang()].ipWithSubnetPrefix;
};

export const ipv6 = (value) => {
	// eslint-disable-next-line max-len
	const ipv6Regex =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

	return value && !value.match(ipv6Regex)
		? validateTranslations[getLang()].ip
		: undefined;
};

/**
 * Checks if the format of the input is corresponding to the IPV4 format or is empty
 * @returns Undefined on success, or Error message
 */
export const dnsOrEmpty = (value) => {
	return value === "" || value === null || dns(value) === undefined
		? undefined
		: validateTranslations[getLang()].ip;
};

/**
 * Checks if the format of the input is corresponding to the IPV6 format or is empty
 * @returns Undefined on success, or Error message
 */
export const ipv6OrEmpty = (value) => {
	const subnetValue =
		value.split("/")[1] !== "" ? value.split("/")[1] : "invalid";

	const isValidSubnetValue =
		value.includes("/") &&
		number(subnetValue) === undefined &&
		subnetValue <= 128
			? undefined
			: "invalid";

	return value === "" ||
		value === null ||
		(ipv6(value.split("/")[0]) === undefined &&
			isValidSubnetValue === undefined)
		? undefined
		: validateTranslations[getLang()].ip;
};

/*
 * Checks if the value is between 0 and 65535
 * @returns Undefined on success, or Error message
 */
export const port = (value) =>
	value && !number(value) && value >= MIN_PORT && value <= MAX_PORT
		? undefined
		: validateTranslations[getLang()].port;

/**
 * Checks if the input is valid
 * @returns Undefined on success, or Error message
 */
export const ports = (value) => {
	const splitedValue = value.replace(/\s/g, "").split("-"); // remove any white space and split by -
	const leftValue = splitedValue[0] || "";
	const rightValue = splitedValue[1] || "";
	const containsDash = value.includes("-");

	//There can only be 0-65535, 123-123, 123 and left < right
	const numbersOnly =
		number(leftValue) === undefined && number(rightValue) === undefined;
	const leftLessThanRight =
		splitedValue.length > 1 &&
		Number.parseInt(leftValue) <= Number.parseInt(rightValue);
	const inRangeLeftValue =
		Number.parseInt(leftValue) >= 0 && Number.parseInt(leftValue) <= 65535;
	const inRangeBothValues =
		inRangeLeftValue &&
		Number.parseInt(rightValue) >= 0 &&
		Number.parseInt(rightValue) <= 65535;

	if (value !== "" && value !== null) {
		if (containsDash && rightValue === "") {
			return validateTranslations[getLang()].number;
		}

		if (containsDash && rightValue !== "") {
			return numbersOnly && leftLessThanRight && inRangeBothValues
				? undefined
				: validateTranslations[getLang()].number;
		}
		return number(leftValue) === undefined && inRangeLeftValue
			? undefined
			: validateTranslations[getLang()].number;
	}
};

export const ttl = (value) =>
	value && !value.match(/^[0-9]+$/)
		? validateTranslations[getLang()].ttl
		: undefined;

export const targetHostname = (value) => {
	return ip(value) && hostname(value) && ipv6(value)
		? validateTranslations[getLang()].ipOrHostname
		: undefined;
};

export const priority = (value) =>
	value !== "" && value !== undefined && !/^\d+$/.test(value)
		? validateTranslations[getLang()].number
		: undefined;

export const mtu = (value) =>
	value && !number(value) && value >= 1 && value <= 9000
		? undefined
		: validateTranslations[getLang()].mtu;

export const peerEndpoint = (value) => {
	if (value.includes(":")) {
		const splitValues = value.split(":");
		const leftValue = splitValues.slice(0, -1)[0];
		const rightValue = splitValues[splitValues.length - 1];
		//[2001:db8:3333:4444:5555:6666:7777:8888]:123

		if (value.match(/\[(.*?)\]/) && value.match(/\[(.*?)\]/)[1] !== "") {
			const ipv6Value = value.match(/\[(.*?)\]/)[1];
			return ipRegex.v6({ exact: true }).test(ipv6Value) && !port(rightValue)
				? undefined
				: validateTranslations[getLang()].peerEndpoint;
		}

		return !hostname(leftValue) && !port(rightValue)
			? undefined
			: validateTranslations[getLang()].peerEndpoint;
	}

	return validateTranslations[getLang()].peerEndpoint;
};

export const publicKey = (value) => {
	const validatePublicKey = !!value.match(
		/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
	);

	return validatePublicKey
		? undefined
		: validateTranslations[getLang()].publicKey;
};

// eslint-disable-next-line max-len
//MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB

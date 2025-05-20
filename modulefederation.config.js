import { dependencies } from "./package.json";

module.exports = {
	name: "networking_vpc",
	filename: "remoteEntry.js",
	exposes: {
		"./vpc": "./src/vpc",
	},
	remotes: {
		container: "host@/general.js",
	},
	shared: {
		react: {
			singleton: true, // true - load this module once
			strictVersion: true, // only necessary version
			requiredVersion: dependencies.react, // define required module version
		},
		"react-router-dom": {
			singleton: true,
			strictVersion: true,
			requiredVersion: dependencies["react-router-dom"],
		},
		"react-i18next": {
			singleton: true,
			strictVersion: true,
			requiredVersion: dependencies["react-i18next"],
		},
		"@tanstack/react-query": {
			singleton: true,
			strictVersion: true,
			requiredVersion: dependencies["@tanstack/react-query"],
		},
	},
};

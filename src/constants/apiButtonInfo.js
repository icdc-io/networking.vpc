export const apiButtonInfo = {
	vmNetworkTable: (vmInterface) => ({
		create: {
			action: "additional_nics",
			vms_ids: [vmInterface.nicId],
		},
		delete: {
			action: "remove_nics",
			nics: { [vmInterface.vmId]: [vmInterface.nicId] },
		},
	}),
	network: (item) => ({
		create: {
			action: "create",
			name: "loc_icdc_name",
			subnet: {
				cidr: "10.208.25.0/24",
				ip_version: 4,
				network_protocol: "ipv4",
				dns_nameservers: ["213.222.50.226"],
				name: "loc_icdc_name_subnet",
			},
		},
		delete: {
			action: "delete",
			id: item.netId,
		},
	}),
	route: (route) => ({
		create: {
			action: "add_route",
			destination: route.destination,
			nexthop: route.nexthop,
		},
		delete: {
			action: "remove_route",
			destination: route.destination,
			nexthop: route.nexthop,
			id: route.netId,
		},
	}),
};

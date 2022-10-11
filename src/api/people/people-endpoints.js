import axiosInstance from "../axiosInstance";

const search_person = async (person) => {
	// const response = await axiosInstance.get(`party/v1/individuals`, {
	// 	params: {
	// 		...person,
	// 	},
	// });
	return dummy_data;
};

const create_person = async (person) => {
	const response = await axiosInstance.post(`party/v1/individuals`, person);
	return response.data;
};

const update_person = async (code, person) => {
	const response = await axiosInstance.put(
		`party/v1/individuals/${code}`,
		person
	);
	return response.data;
};

const get_person_by_code = async (code) => {
	// const response = await axiosInstance.get(`party/v1/individuals/${code}`);
	// return response.data;
	return dummy_individual;
};

const get_genders = async () => {
	const response = await axiosInstance.get(`party/v1/genders`);
	return response.data;
};

const get_marital_statuses = async () => {
	const response = await axiosInstance.get(`party/v1/marital-statuses`);
	return response.data;
};

const get_worker_types = async () => {
	const response = await axiosInstance.get(`party/v1/worker-types`);
	return response.data;
};

const get_economic_classes = async () => {
	const response = await axiosInstance.get(`party/v1/economic-classes`);
	return response.data;
};

const get_relation_types = async (groupCode) => {
	const response = await axiosInstance.get(
		`party/v1/relation-types/${groupCode}`
	);
	return response.data;
};

const add_relation_with_new_person = async (code, person) => {
	const response = await axiosInstance.put(
		`party/v1/individuals/${code}/relations`,
		person
	);
	return response.data;
};

export {
	search_person,
	create_person,
	get_person_by_code,
	get_genders,
	get_marital_statuses,
	get_worker_types,
	get_economic_classes,
	update_person,
	get_relation_types,
	add_relation_with_new_person,
};

const dummy_data = {
	total: 1,
	values: [
		{
			code: 1,
			firstName: "Daniel",
			lastName: "Gomez",
			residenceCountry: {
				name: "ARGENTINA",
				code: "ARG",
				areaCode: "54",
			},
			gender: {
				name: "Masculino",
				code: "MALE",
			},
			identifications: {
				values: [
					{
						value: "31564065",
						type: {
							name: "DNI",
							code: "DNI",
						},
						default: true,
					},
				],
			},
			activeDate: "2022-09-23T03:41:28Z",
		},
	],
};

const dummy_individual = {
	data: {
		firstName: "Daniel",
		lastName: "Gomez",
		birthdate: "1075-07-24",
		gender: {
			name: "Masculino",
			code: "MALE",
		},
		maritalStatus: {
			name: "Casado",
			code: "MARRIED",
		},
		country: {
			name: "ARGENTINA",
			code: "ARG",
			areaCode: "54",
		},
	},
	identifications: {
		values: [
			{
				value: "31564065",
				type: {
					name: "DNI",
					code: "DNI",
				},
				default: true,
			},
		],
	},
	mails: {
		values: [
			{
				value: "daniel@gomez.com",
				type: {
					name: "Laboral",
					code: "WORK",
				},
			},
		],
	},
	phones: {
		values: [
			{
				locationCode: "555",
				areaCode: "776666",
				number: "3898967676767676724234",
				extension: "234",
				type: {
					name: "Laboral",
					code: "WORK",
				},
			},
		],
	},
	workerTypes: {
		values: [],
	},
	economicClasses: {
		values: [],
	},
	practices: {
		values: [],
	},
	fiscalCategories: {
		values: [],
	},
	addresses: null,
	nationalities: {
		values: [],
	},
};

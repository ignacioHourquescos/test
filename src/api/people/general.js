import axiosInstance from "../axiosInstance";

const get_sectors = async () => {
	const response = await axiosInstance.get(`party/v1/sectors`);
	return response.data;
};

const get_activities = async (sector) => {
	const response = await axiosInstance.get(`party/v1/activities/${sector}`);
	return response.data;
};

const get_practices = async (activity) => {
	const response = await axiosInstance.get(`party/v1/practices/${activity}`);
	return response.data;
};

const get_fiscal_categories = async (personType, countryCode) => {
	const response = await axiosInstance.get(
		`party/v1/fiscal-categories?party-type-code=${personType}&country-code=${countryCode}`
	);
	return response.data;
};

const get_mail_types = async () => {
	const response = await axiosInstance.get(`party/v1/mail-types`);
	return response.data;
};
const get_phone_types = async () => {
	const response = await axiosInstance.get(`party/v1/phone-types`);
	return response.data;
};

const get_identification_types = async (personType, countryCode) => {
	const response = await axiosInstance.get(
		`party/v1/identification-types?party-type-code=${personType}&country-code=${countryCode}`
	);
	return response.data;
};

const get_relations = async (code) => {
	console.log("code", code);
	const response = await axiosInstance.get(
		`party/v1/parties/${code}/relations`
	);
	return response.data;
};

const get_notes = async (code) => {
	const response = await axiosInstance.get(`party/v1/parties/${code}/notes`);
	return response.data;
};

const get_files = async (code) => {
	const response = await axiosInstance.get(`party/v1/parties/${code}/files`);
	return response.data;
};

const update_notes = async (code, notes) => {
	const response = await axiosInstance.put(
		`party/v1/parties/${code}/notes`,
		notes
	);
	return response.data;
};

const update_files = async (code, notes) => {
	const response = await axiosInstance.put(
		`party/v1/parties/${code}/files`,
		notes
	);
	return response.data;
};

const add_relation_with_existing_party = async (code, relation) => {
	const response = await axiosInstance.put(
		`party/v1/parties/${code}/relations`,
		relation
	);
	return response.data;
};

const get_relations_by_party_code = async (code) => {
	const response = await axiosInstance.get(
		`party/v1/parties/${code}/relations`
	);
	return response.data;
};

const remove_relation = async (code, relation) => {
	const response = await axiosInstance.put(
		`party/v1/parties/${code}/relations/disable`,
		relation
	);
	return response.data;
};

const get_file = async (partyCode, fileCode) => {
	const response = await axiosInstance.get(
		`party/v1/parties/${partyCode}/file/${fileCode}`
	);
	return response.data;
};

export {
	get_identification_types,
	get_relations,
	get_notes,
	get_files,
	get_sectors,
	get_practices,
	get_activities,
	get_fiscal_categories,
	get_mail_types,
	get_phone_types,
	update_notes,
	update_files,
	add_relation_with_existing_party,
	get_relations_by_party_code,
	remove_relation,
	get_file,
};

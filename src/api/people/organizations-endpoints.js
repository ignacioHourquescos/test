import axiosInstance from "../axiosInstance";

const search_organization = async (organization) => {
  const response = await axiosInstance.get(`party/v1/organisations`, {
    params: {
      ...organization,
    },
  });
  return response.data;
};

const get_organization_types = async () => {
  const response = await axiosInstance.get(`party/v1/organisation-types`);
  return response.data;
};

const create_organization = async (organization) => {
  const response = await axiosInstance.post(
    `party/v1/organisations`,
    organization
  );
  return response.data;
};

const update_organization = async (code, organization) => {
  const response = await axiosInstance.put(
    `party/v1/organisations/${code}`,
    organization
  );
  return response.data;
};

const get_organization_by_code = async (code) => {
  const response = await axiosInstance.get(`party/v1/organisations/${code}`);
  return response.data;
};

const add_relation_with_new_organization = async (code, organization) => {
  const response = await axiosInstance.put(
    `party/v1/organisations/${code}/relations`,
    organization
  );
  return response.data;
};

export {
  search_organization,
  get_organization_types,
  create_organization,
  get_organization_by_code,
  update_organization,
  add_relation_with_new_organization,
};

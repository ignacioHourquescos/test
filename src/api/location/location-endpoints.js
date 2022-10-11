import axiosInstance from "../axiosInstance";

const get_countries = async () => {
  const response = await axiosInstance.get(`location/v1/countries`);
  return response.data;
};

const get_country_by_code = async (code) => {
  const response = await axiosInstance.get(`location/v1/countries/${code}`);
  return response.data;
};

const get_provinces = async (countryCode) => {
  const response = await axiosInstance.get(
    `location/v1/countries/${countryCode}/provinces`
  );
  return response.data;
};

const get_cities = async (provinceCode) => {
  const response = await axiosInstance.get(
    `location/v1/provinces/${provinceCode}/cities`
  );
  return response.data;
};

const get_postal_codes = async (cityCode) => {
  const response = await axiosInstance.get(
    `location/v1/cities/${cityCode}/postal-codes`
  );
  return response.data;
};

const get_addresses_by_party_code = async (code) => {
  const response = await axiosInstance.get(
    `location/v1/party/${code}/addresses`
  );
  return response.data;
};

const get_address_types = async () => {
  const response = await axiosInstance.get(`location/v1/address-types`);
  return response.data;
};

export {
  get_countries,
  get_provinces,
  get_cities,
  get_postal_codes,
  get_country_by_code,
  get_addresses_by_party_code,
  get_address_types,
};

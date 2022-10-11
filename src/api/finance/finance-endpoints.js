import axiosInstance from "../axiosInstance";

const get_payment_methods_by_party_code = async (code) => {
  const response = await axiosInstance.get(
    `party/v1/parties/${code}/payment-methods`
  );
  return response.data;
};

const get_credit_card_types = async () => {
  const response = await axiosInstance.get(`finance/v1/credit-card-types`);
  return response.data;
};

const update_payments = async (code, payments) => {
  const response = await axiosInstance.put(
    `party/v1/parties/${code}/payment-methods`,
    payments
  );
  return response.data;
};

const get_banks = async () => {
  const response = await axiosInstance.get(`finance/v1/banks`);
  return response.data;
};

const get_currencies = async () => {
  const response = await axiosInstance.get(`finance/v1/currencies`);
  return response.data;
};

const get_bank_account_types = async () => {
  const response = await axiosInstance.get(`finance/v1/bank-account-types`);
  return response.data;
};

const get_bank_branches = async (bank) => {
  const response = await axiosInstance.get(`finance/v1/banks/${bank}/branches`);
  return response.data;
};

export {
  get_payment_methods_by_party_code,
  get_credit_card_types,
  update_payments,
  get_banks,
  get_currencies,
  get_bank_account_types,
  get_bank_branches,
};

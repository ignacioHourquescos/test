import React, { useState, useEffect } from "react";
import { Inner } from "./styles";
import { Form, Input, Button, Select, Tooltip, Row, Col } from "antd";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../../common/floatingLabel/FloatingLabel";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../../utils/notificationToast";
import {
	get_banks,
	get_bank_account_types,
	get_bank_branches,
	get_currencies,
	update_payments,
} from "../../../../../../../../../api/finance/finance-endpoints";

const { Option } = Select;

export default function EditPaymentDebit({
	code,
	payments,
	item,
	idx,
	onEdit,
	onCancel,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [banks, setBanks] = useState([]);
	const [bankAccountTypes, setBankAccountTypes] = useState([]);
	const [currencies, setCurrencies] = useState([]);
	const [bankBranches, setBankBranches] = useState([]);
	const [submitting, setSubmitting] = useState(false);

	const formValues = Form.useWatch([], form);
	const bank = Form.useWatch("bank", form);

	useEffect(() => {
		const fetch_banks = async () => {
			const data = await get_banks();
			setBanks(data.values || []);
		};

		const fetch_currencies = async () => {
			const data = await get_currencies();
			setCurrencies(data.values || []);
		};

		const fetch_bank_account_types = async () => {
			const data = await get_bank_account_types();
			setBankAccountTypes(data.values || []);
		};

		fetch_banks();
		fetch_currencies();
		fetch_bank_account_types();
	}, []);

	const fetch_bank_branches = async (bank) => {
		const data = await get_bank_branches(bank);
		setBankBranches(data.values || []);
	};

	useEffect(() => {
		if (bank) fetch_bank_branches(bank);
	}, [bank]);

	const resetForm = () => {
		form.resetFields();
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const post_data = {
				cashData:
					payments.cashData.values.length > 0
						? {
								values: payments.cashData.values.map((el) => {
									return {
										currencyCode: el.currencyCode,
									};
								}),
						  }
						: null,
				creditCardData:
					payments.creditCardData.values.length > 0
						? {
								values: payments.creditCardData.values.map((el) => {
									return {
										ownerName: el.ownerName,
										number: el.number,
										securityCode: el.securityCode,
										dateFrom: el.dateFrom,
										dateTo: el.dateTo,
										typeCode: el.cardType.code,
									};
								}),
						  }
						: null,
				bankAccountData: {
					values: [
						...payments.bankAccountData.values.map((el, index) => {
							return index === idx
								? {
										cbu: values.debit_cbu,
										number: values.debit_accountNumber,
										bankBranchCode: values.debit_subsidiary,
										currencyCode: values.debit_currency,
										bankAccountTypeCode: values.debit_accountType,
								  }
								: {
										number: el.number,
										cbu: el.cbu,
										currencyCode: el.currency.code,
										bankBranchCode: el.bankBranch.code,
										bankAccountTypeCode: el.bankAccountType.code,
								  };
						}),
					],
				},
			};

			await update_payments(code, post_data);

			onEdit();
			onCancel();

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-edited-payment-method-title-ok"),
				t("notification-edited-payment-method-long-ok")
			);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Inner>
			<Form
				form={form}
				name="create-debit-form"
				layout="vertical"
				onFinish={onFinish}
				initialValues={{
					debit_cbu: item.cbu,
					debit_accountNumber: item.number,
					debit_subsidiary: item.bankBranch.code,
					debit_currency: item.currency.code,
					debit_accountType: item.bankAccountType.code,
					bank: item.bankBranch.bank.code,
				}}
			>
				<FloatingLabel
					label={t("bank-lbl")}
					value={formValues?.bank}
					hint={t("bank-hint")}
				>
					<Form.Item
						name="bank"
						rules={[
							{
								required: true,
								message: "Este campo es obligatorio",
							},
						]}
					>
						<Select allowClear={true}>
							{banks.map((bank) => (
								<Option key={bank.code} value={bank.code}>
									{bank.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("account-type-lbl")}
					value={formValues?.debit_accountType}
					hint={t("account-type-hint")}
				>
					<Form.Item
						name="debit_accountType"
						rules={[
							{
								required: true,
								message: "Este campo es obligatorio",
							},
						]}
					>
						<Select allowClear={true} disabled={!formValues?.bank}>
							{bankAccountTypes.map((accountType) => (
								<Option key={accountType.code} value={accountType.code}>
									{accountType.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("branch-office-lbl")}
					value={formValues?.debit_subsidiary}
					hint={t("branch-office-hint")}
				>
					<Form.Item
						name="debit_subsidiary"
						rules={[
							{
								required: true,
								message: "Este campo es obligatorio",
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={
								!formValues?.bank || !bankBranches || bankBranches?.length === 0
							}
						>
							{bankBranches.map((branch) => (
								<Option key={branch.code} value={branch.code}>
									{branch.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("account-number-lbl")}
					value={formValues?.debit_accountNumber}
					hint={t("account-number-hint")}
				>
					<Form.Item
						name="debit_accountNumber"
						rules={[
							{
								required: true,
								message: "Este campo es obligatorio",
							},
						]}
					>
						<Input type="number" disabled={!formValues?.bank} />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("cbu-lbl")}
					value={formValues?.debit_cbu}
					hint={t("cbu-hint")}
				>
					<Form.Item
						name="debit_cbu"
						rules={[
							{
								required: true,
								message: "Este campo es obligatorio",
							},
						]}
					>
						<Input type="number" disabled={!formValues?.bank} />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("currency-lbl")}
					value={formValues?.debit_currency}
					hint={t("currency-hint")}
				>
					<Form.Item
						name="debit_currency"
						rules={[
							{
								required: true,
								message: "Este campo es obligatorio",
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={
								!formValues?.bank || !currencies || currencies?.length === 0
							}
						>
							{currencies.map((currency) => (
								<Option key={currency.code} value={currency.code}>
									{currency.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<Row gutter={8}>
					<Col>
						<Form.Item>
							<Button type="primary" htmlType="submit" loading={submitting}>
								{t("save-btn")}
							</Button>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item>
							<Button
								type="secondary"
								htmlType="button"
								disabled={submitting}
								onClick={onCancel}
							>
								{t("cancel-btn")}
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Inner>
	);
}

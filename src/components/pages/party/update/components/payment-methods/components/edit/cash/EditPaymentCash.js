import React, { useState, useEffect } from "react";
import { Inner } from "./styles";
import { Form, Button, Select, Row, Col } from "antd";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../../common/floatingLabel/FloatingLabel";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../../utils/notificationToast";
import {
	get_currencies,
	update_payments,
} from "../../../../../../../../../api/finance/finance-endpoints";

const { Option } = Select;

export default function EditPaymentCash({
	code,
	payments,
	item,
	onEdit,
	onCancel,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [currencies, setCurrencies] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const cash_currency = Form.useWatch("cash_currency", form);

	useEffect(() => {
		const fetch_currencies = async () => {
			const data = await get_currencies();
			setCurrencies(data.values || []);
		};

		fetch_currencies();
	}, []);

	const resetForm = () => {
		form.resetFields();
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const post_data = {
				bankAccountData:
					payments.bankAccountData.values.length > 0
						? {
								values: payments.bankAccountData.values.map((el) => {
									return {
										number: el.number,
										cbu: el.cbu,
										currencyCode: el.currency.code,
										bankBranchCode: el.bankBranch.code,
										bankAccountTypeCode: el.bankAccountType.code,
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
				cashData: {
					values: [
						...payments.cashData.values.map((el) => {
							return el.currencyCode === item.currencyCode
								? { currencyCode: values.cash_currency }
								: {
										currencyCode: el.currencyCode,
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
					cash_currency: item.currencyCode,
				}}
			>
				<FloatingLabel
					label={t("currency-lbl")}
					value={cash_currency}
					hint={t("currency-hint")}
				>
					<Form.Item
						name="cash_currency"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={!currencies || currencies?.length === 0}
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

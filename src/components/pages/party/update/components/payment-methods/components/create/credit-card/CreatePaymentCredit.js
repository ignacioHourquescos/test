import React, { useState, useEffect } from "react";
import { Inner } from "./styles";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../../common/floatingLabel/FloatingLabel";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../../utils/notificationToast";
import {
	get_credit_card_types,
	update_payments,
} from "../../../../../../../../../api/finance/finance-endpoints";
import moment from "moment";

const { Option } = Select;

export default function CreatePaymentCredit({ code, payments, onCreate }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [creditCardTypes, setCreditCardTypes] = useState([]);
	const [submitting, setSubmitting] = useState(false);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		const fetch_credit_card_types = async () => {
			const data = await get_credit_card_types();
			setCreditCardTypes(data.values || []);
		};

		fetch_credit_card_types();
	}, []);

	const resetForm = () => {
		form.resetFields();
	};

	const onFinish = async (values) => {
		try {
			// if (moment(values.card_expireDate) < moment()) {
			//   openNotificationWithIcon(
			//     TYPE.WARNING,
			//     "Tarjeta Vencida",
			//     "La tarjeta de credito que ingreso esta vencida, por favor ingrese otra. Gracias."
			//   );

			//   return;
			// }

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
				creditCardData: {
					values: [
						...payments.creditCardData.values.map((el) => {
							return {
								ownerName: el.ownerName,
								number: el.number,
								securityCode: el.securityCode,
								dateFrom: el.dateFrom,
								dateTo: el.dateTo,
								typeCode: el.cardType.code,
							};
						}),
						{
							ownerName: values.card_name,
							typeCode: values.card_provider,
							number: values.card_number,
							securityCode: parseInt(values.card_securityCode),
							dateFrom: null,
							dateTo: moment(values.card_expireDate).format("YYYY-MM-DD"),
						},
					],
				},
			};

			await update_payments(code, post_data);

			onCreate();
			resetForm();

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-created-payment-method-title-ok"),
				t("notification-created-payment-method-long-ok")
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
				name="create-credit-card-form"
				layout="vertical"
				onFinish={onFinish}
			>
				<FloatingLabel
					label={t("supplier-lbl")}
					value={formValues?.card_provider}
					hint={t("supplier-hint")}
				>
					<Form.Item
						name="card_provider"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true}>
							{creditCardTypes.map((cardProvider) => (
								<Option key={cardProvider.code} value={cardProvider.code}>
									{cardProvider.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("name-lbl")}
					value={formValues?.card_name}
					hint={t("name-hint")}
				>
					<Form.Item
						name="card_name"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
							{
								max: 50,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Input type="text" disabled={!formValues?.card_provider} />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("card-number-lbl")}
					value={formValues?.card_number}
					hint={t("card-number-hint")}
				>
					<Form.Item
						name="card_number"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
							{
								max: 50,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Input type="text" disabled={!formValues?.card_provider} />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("security-code-lbl")}
					value={formValues?.card_securityCode}
					hint={t("security-code-hint")}
				>
					<Form.Item
						name="card_securityCode"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Input type="number" disabled={!formValues?.card_provider} />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("due-date-lbl")}
					value={formValues?.card_expireDate}
					hint={t("due-date-hint")}
				>
					<Form.Item
						name="card_expireDate"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<DatePicker
							format="MM/YYYY"
							allowClear={true}
							style={{ width: "100%" }}
							placeholder=""
							picker="month"
							disabled={!formValues?.card_provider}
						/>
					</Form.Item>
				</FloatingLabel>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={submitting}>
						{t("add-btn")}
					</Button>
				</Form.Item>
			</Form>
		</Inner>
	);
}

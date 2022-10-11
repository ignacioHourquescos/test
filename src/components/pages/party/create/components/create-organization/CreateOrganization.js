import React, { useState, useEffect } from "react";
import { Error, Errors, Inner } from "./styles";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import { useTranslation } from "../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../common/floatingLabel/FloatingLabel";
import moment from "moment";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../utils/notificationToast";
import { get_countries } from "../../../../../../api/location/location-endpoints";
import {
	create_organization,
	get_organization_by_code,
	get_organization_types,
} from "../../../../../../api/people/organizations-endpoints";
import { get_identification_types } from "../../../../../../api/people/general";

const { Option } = Select;

export default function CreateOrganization({ onResult }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [formValues, setFormValues] = useState(null);
	const [countries, setCountries] = useState([]);
	const [organizationTypes, setOrganizationTypes] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);

	const identificationType = Form.useWatch("identificationType", form);
	const identificationValue = Form.useWatch("identificationValue", form);

	useEffect(() => {
		const fetch_countries = async () => {
			const data = await get_countries();
			setCountries(data.countries || []);
		};

		const fetch_organization_types = async () => {
			const data = await get_organization_types();
			setOrganizationTypes(data.values || []);
		};

		fetch_countries();
		fetch_organization_types();
	}, []);

	const resetForm = () => {
		form.resetFields();
		setFormValues(null);
		setIdentificationTypes([]);
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const organization = {
				...values,
				foundationDate: moment(values.foundationDate).format("YYYY-MM-DD"),
			};

			const response = await create_organization({
				data: {
					name: organization.name,
					// foundationDate: organization.foundationDate,
					hostCountryCode: organization.hostCountryCode,
					typeCode: organization.typeCode,
				},
				identifications: {
					values: [
						{
							value: organization.identificationValue,
							typeCode: organization.identificationType,
							default: true,
						},
					],
				},
			});

			const resultOrganization = await get_organization_by_code(response.code);

			if (!resultOrganization) {
				onResult([]);
			}

			onResult([
				{
					key: response.code,
					name: resultOrganization.data.name,
					identificationsValue:
						resultOrganization.identifications?.values[0]?.value || null,
					identificationsType:
						resultOrganization.identifications?.values[0]?.type?.name || null,
				},
			]);

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-created-legal-person-title-ok"),
				t("notification-created-legal-person-long-ok", values.name)
			);

			resetForm();
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	const onValuesChange = () => {
		setFormValues(form.getFieldsValue());
	};

	const onCountryChange = async (value) => {
		form.setFieldsValue({ identificationType: null });
		form.setFieldsValue({ identificationValue: null });
		if (!value) {
			setIdentificationTypes([]);
			return;
		}
		const data = await get_identification_types("ORGANISATION", value);
		setIdentificationTypes(data.values || []);
	};

	return (
		<Inner>
			<Form
				form={form}
				name="create-organization-form"
				layout="vertical"
				onFinish={onFinish}
				onValuesChange={onValuesChange}
			>
				<FloatingLabel
					label={t("business-name-lbl")}
					value={formValues?.name}
					hint={t("business-name-hint")}
				>
					<Form.Item
						name="name"
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
						<Input />
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("organization-type-lbl")}
					value={formValues?.typeCode}
					hint={t("organization-type-hint")}
				>
					<Form.Item
						name="typeCode"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true}>
							{organizationTypes.map((type) => (
								<Option key={type.code} value={type.code}>
									{type.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("country-code-lbl")}
					value={formValues?.hostCountryCode}
					hint={t("country-code-hint")}
				>
					<Form.Item
						name="hostCountryCode"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true} onChange={onCountryChange}>
							{countries.map((country) => (
								<Option key={country.code} value={country.code}>
									{country.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("id-type-lbl")}
					value={identificationType}
					hint={t("id-type-hint")}
				>
					<Form.Item
						name="identificationType"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select
							allowClear={true}
							disabled={identificationTypes.length <= 0}
						>
							{identificationTypes.map((identificationType) => (
								<Option
									key={identificationType.code}
									value={identificationType.code}
								>
									{identificationType.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("identification-number-lbl")}
					value={identificationValue}
					hint={t("identification-number-hint")}
				>
					<Form.Item
						name="identificationValue"
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
						<Input disabled={!identificationType} />
					</Form.Item>
				</FloatingLabel>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={submitting}>
						{t("party-create-menu")}
					</Button>
				</Form.Item>
			</Form>
		</Inner>
	);
}

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { Inner } from "./styles";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { get_countries } from "../../../../../../../../api/location/location-endpoints";
import { get_identification_types } from "../../../../../../../../api/people/general";
import { search_organization } from "../../../../../../../../api/people/organizations-endpoints";

const { Option } = Select;

export default function SearchOrganization({ onSearch }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [countries, setCountries] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);
	const [error, setError] = useState(false);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		if (formValues?.name || formValues?.identificationValue) setError(false);
	}, [formValues]);

	useEffect(() => {
		const fetch_countries = async () => {
			const data = await get_countries();
			setCountries(data.countries || []);
		};

		fetch_countries();
	}, []);

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

	const onIdentityTypeClear = () => {
		form.setFieldsValue({ identificationValue: null });
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const res = await search_organization({
				identificationTypeCode: values.identificationType || null,
				identificationValue: values.identificationValue || null,
				hostCountryCode: values.hostCountryCode || null,
			});
			const organizations = res?.values?.map((organization) => {
				return {
					key: organization.code,
					name: organization.name,
					identificationTypeCode: values.identificationType,
					identificationNumber: values.identificationValue,
					hostCountryCode: values.hostCountryCode,
				};
			});

			setSubmitting(false);
			onSearch(organizations, values);
		} catch (error) {
			console.error(error);
			setSubmitting(false);
		}
	};

	return (
		<Inner>
			<Form
				form={form}
				name="search-organization-relations"
				layout="vertical"
				onFinish={onFinish}
			>
				<FloatingLabel
					label={t("country-of-residence-lbl")}
					value={formValues?.hostCountryCode}
					hint={t("country-of-residence-hint")}
				>
					<Form.Item
						name="hostCountryCode"
						rules={[
							{
								required: true,
								message: t("maximum-character-lbl", 50),
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
					value={formValues?.identificationType}
					hint={t("id-type-hint")}
				>
					<Form.Item
						name="identificationType"
						rules={[
							{
								required: true,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Select
							allowClear={true}
							onClear={onIdentityTypeClear}
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
					value={formValues?.identificationValue}
					hint={t("identification-number-hint")}
				>
					<Form.Item
						name="identificationValue"
						rules={[
							{
								required: true,
								message: t("maximum-character-lbl", 50),
							},
							{
								max: 50,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Input disabled={!formValues?.identificationType} />
					</Form.Item>
				</FloatingLabel>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={submitting}>
						{t("search-legal-entity-subtitle")}
					</Button>
				</Form.Item>
			</Form>
		</Inner>
	);
}

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { Inner } from "./styles";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import { search_person } from "../../../../../../../../api/people/people-endpoints";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { get_countries } from "../../../../../../../../api/location/location-endpoints";
import { get_identification_types } from "../../../../../../../../api/people/general";

const { Option } = Select;

export default function SearchPerson({ onSearch }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [countries, setCountries] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);
	const [error, setError] = useState(false);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		if (formValues?.lastName || formValues?.identificationValue)
			setError(false);
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
		const data = await get_identification_types("INDIVIDUAL", value);
		setIdentificationTypes(data.values || []);
	};

	const onIdentityTypeClear = () => {
		form.setFieldsValue({ identificationValue: null });
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const res = await search_person({
				identificationTypeCode: values.identificationType || null,
				identificationValue: values.identificationValue || null,
				residenceCountryCode: values.residenceCountryCode || null,
			});

			const people = res?.values?.map((person) => {
				return {
					key: person.code,
					firstName: person.firstName,
					lastName: person.lastName,
					identificationTypeCode: values.identificationType,
					identificationNumber: values.identificationValue,
					residenceCountryName: person.residenceCountry.name,
					residenceCountryCode: person.residenceCountry.code,
					genderCode: person.gender.code,
				};
			});

			onSearch(people, values);
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
				name="search-person-relations"
				layout="vertical"
				onFinish={onFinish}
			>
				<FloatingLabel
					label={t("country-of-residence-lbl")}
					value={formValues?.residenceCountryCode}
					hint={t("country-of-residence-hint")}
				>
					<Form.Item
						name="residenceCountryCode"
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
					value={formValues?.identificationType}
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
								message: t("field-required-lbl"),
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
						{t("search-person-subtitle")}
					</Button>
				</Form.Item>
			</Form>
		</Inner>
	);
}

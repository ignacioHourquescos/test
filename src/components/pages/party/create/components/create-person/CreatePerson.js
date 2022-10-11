import React, { useState, useEffect } from "react";
import { Error, Errors, Inner } from "./styles";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { useTranslation } from "../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../common/floatingLabel/FloatingLabel";
import moment from "moment";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../utils/notificationToast";
import {
	create_person,
	get_genders,
	get_person_by_code,
} from "../../../../../../api/people/people-endpoints";
import { get_countries } from "../../../../../../api/location/location-endpoints";
import { get_identification_types } from "../../../../../../api/people/general";

const { Option } = Select;

export default function CreatePerson({ onResult }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [formValues, setFormValues] = useState(null);
	const [genders, setGenders] = useState([]);
	const [countries, setCountries] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);

	const identificationType = Form.useWatch("identificationType", form);
	const identificationValue = Form.useWatch("identificationValue", form);

	useEffect(() => {
		const fetch_genders = async () => {
			const data = await get_genders();
			setGenders(data.values || []);
		};

		const fetch_countries = async () => {
			const data = await get_countries();
			setCountries(data.countries || []);
		};

		fetch_genders();
		fetch_countries();
	}, []);

	const resetForm = () => {
		form.resetFields();
		setFormValues(null);
		setIdentificationTypes([]);
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const person = {
				...values,
				birthdate: moment(values.birthdate).format("YYYY-MM-DD"),
			};

			const response = await create_person({
				data: {
					firstName: person.firstName,
					lastName: person.lastName,
					genderCode: person.genderCode,
					residenceCountryCode: person.residenceCountryCode,
				},
				identifications: {
					values: [
						{
							value: person.identificationValue,
							typeCode: person.identificationType,
							default: true,
						},
					],
				},
			});

			const resultPerson = await get_person_by_code(response.code);
			if (!resultPerson) {
				onResult([]);
			}

			onResult([
				{
					key: response.code,
					firstName: resultPerson.data.firstName,
					lastName: resultPerson.data.lastName,
					identificationsValue:
						resultPerson.identifications?.values[0]?.value || null,
					identificationsType:
						resultPerson.identifications?.values[0]?.type?.name || null,
				},
			]);

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-created-physical-person-title-ok"),
				t(
					"notification-created-physical-person-long-ok",
					values.firstName,
					values.lastName
				)
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
		const data = await get_identification_types("INDIVIDUAL", value);
		setIdentificationTypes(data.values || []);
	};

	return (
		<Inner>
			<Form
				form={form}
				name="create-person-form"
				layout="vertical"
				onFinish={onFinish}
				onValuesChange={onValuesChange}
			>
				<FloatingLabel
					label={t("name-lbl")}
					value={formValues?.firstName}
					hint={t("name-hint")}
				>
					<Form.Item
						name="firstName"
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
					label={t("last-name-subtitle")}
					value={formValues?.lastName}
					hint={t("last-name-hint")}
				>
					<Form.Item
						name="lastName"
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
					label={t("gender-lbl")}
					value={formValues?.genderCode}
					hint={t("gender-hint")}
				>
					<Form.Item
						name="genderCode"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select allowClear={true}>
							{genders.map((gender) => (
								<Option key={gender.code} value={gender.code}>
									{gender.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

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

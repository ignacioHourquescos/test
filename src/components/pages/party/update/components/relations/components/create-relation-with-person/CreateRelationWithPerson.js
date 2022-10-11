import React, { useState, useEffect } from "react";
import { Inner, CreatePersonMessage } from "./styles";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { get_genders } from "../../../../../../../../api/people/people-endpoints";
import { get_countries } from "../../../../../../../../api/location/location-endpoints";
import { get_identification_types } from "../../../../../../../../api/people/general";
import { add_relation_with_new_person } from "../../../../../../../../api/people/people-endpoints";

const { Option } = Select;

export default function CreateRelationWithPerson({
	code,
	relationTypes,
	initialValues,
	onCancel,
	onCreated,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [genders, setGenders] = useState([]);
	const [countries, setCountries] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		const fetch_genders = async () => {
			const data = await get_genders();
			setGenders(data.values || []);
		};

		const fetch_countries = async () => {
			const data = await get_countries();
			setCountries(data.countries || []);
		};

		const fetch_identification_types = async () => {
			const data = await get_identification_types(
				"INDIVIDUAL",
				initialValues.residenceCountryCode
			);
			setIdentificationTypes(data.values || []);
		};

		fetch_identification_types();
		fetch_genders();
		fetch_countries();
	}, []);

	const resetForm = () => {
		form.resetFields();
		setIdentificationTypes([]);
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);
			await add_relation_with_new_person(code, {
				relationTypeCode: values.relationType,
				firstName: values.firstName,
				lastName: values.lastName,
				genderCode: values.genderCode,
				identificationTypeCode: values.identificationType,
				identificationNumber: values.identificationValue,
				residenceCountryCode: values.residenceCountryCode,
			});

			onCreated();

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-created-relation-title-ok"),
				t("notification-created-relation-long-ok")
			);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	const onCountryChange = async (value) => {
		const data = await get_identification_types("INDIVIDUAL", value);
		setIdentificationTypes(data.values || []);
		form.setFieldsValue({ identificationType: null });
		form.setFieldsValue({ identificationValue: null });
	};

	if (!relationTypes) return <div>Loading...</div>;

	return (
		<Inner>
			<Form
				form={form}
				name="create-person-form"
				layout="vertical"
				onFinish={onFinish}
				initialValues={initialValues}
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
						<Select onChange={onCountryChange} disabled={true}>
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
						<Select disabled={true}>
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
						<Input disabled={true} />
					</Form.Item>
				</FloatingLabel>

				<CreatePersonMessage>
					{t("person-not-found-complete-create-lbl")}
				</CreatePersonMessage>

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
					label={t("last-name-lbl")}
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
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Select>
							{genders.map((gender) => (
								<Option key={gender.code} value={gender.code}>
									{gender.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<FloatingLabel
					label={t("type-relation-lbl")}
					value={formValues?.relationType}
					hint={t("type-relation-hint")}
				>
					<Form.Item
						name="relationType"
						rules={[
							{
								required: true,
								message: t("field-required-lbl"),
							},
						]}
					>
						<Select>
							{relationTypes.map((rel) => (
								<Option key={rel.code} value={rel.code}>
									{rel.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<Row gutter={8}>
					<Col>
						<Form.Item>
							<Button type="primary" htmlType="submit" loading={submitting}>
								{t("create-add-btn")}
							</Button>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item>
							<Button
								type="secondary"
								htmlType="button"
								disabled={submitting}
								onClick={() => onCancel()}
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

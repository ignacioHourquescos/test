import React, { useState, useEffect } from "react";
import { Inner, CreatePersonMessage } from "./styles";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { get_countries } from "../../../../../../../../api/location/location-endpoints";
import {
	add_relation_with_new_organization,
	get_organization_types,
} from "../../../../../../../../api/people/organizations-endpoints";
import { get_identification_types } from "../../../../../../../../api/people/general";

const { Option } = Select;

export default function CreateRelationWithOrganization({
	code,
	relationTypes,
	initialValues,
	onCancel,
	onCreated,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [countries, setCountries] = useState([]);
	const [organizationTypes, setOrganizationTypes] = useState([]);
	const [identificationTypes, setIdentificationTypes] = useState([]);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		const fetch_countries = async () => {
			const data = await get_countries();
			setCountries(data.countries || []);
		};

		const fetch_organization_types = async () => {
			const data = await get_organization_types();
			setOrganizationTypes(data.values || []);
		};
		const fetch_identification_types = async () => {
			const data = await get_identification_types(
				"ORGANISATION",
				initialValues.hostCountryCode
			);
			setIdentificationTypes(data.values || []);
		};

		fetch_identification_types();

		fetch_countries();
		fetch_organization_types();
	}, []);

	const resetForm = () => {
		form.resetFields();
		setIdentificationTypes([]);
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);
			await add_relation_with_new_organization(code, {
				typeCode: values.relationType,
				organisationName: values.name,
				organisationTypeCode: values.typeCode,
				identificationTypeCode: values.identificationType,
				identificationNumber: values.identificationValue,
				residenceCountryCode: values.hostCountryCode,
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
		form.setFieldsValue({ identificationType: null });
		form.setFieldsValue({ identificationValue: null });
		if (!value) {
			setIdentificationTypes([]);
			return;
		}
		const data = await get_identification_types("ORGANISATION", value);
		setIdentificationTypes(data.values || []);
	};

	if (!relationTypes) return <div>Loading...</div>;

	return (
		<Inner>
			<Form
				form={form}
				name="create-organization-form"
				layout="vertical"
				onFinish={onFinish}
				initialValues={initialValues}
			>
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
						<Select allowClear={true} disabled onChange={onCountryChange}>
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
						<Select allowClear={true} disabled>
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
						<Input disabled />
					</Form.Item>
				</FloatingLabel>

				<CreatePersonMessage>
					{t("person-not-found-complete-create-lbl")}
				</CreatePersonMessage>

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
						<Select allowClear={true}>
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

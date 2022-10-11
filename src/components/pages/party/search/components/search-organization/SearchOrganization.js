import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import {
	AdvancedSearch,
	AdvancedSearchButton,
	Inner,
	Message,
	WarningMessage,
} from "./styles";
import { useTranslation } from "../../../../../../contexts/translationContext";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import FloatingLabel from "../../../../../common/floatingLabel/FloatingLabel";
import { search_organization } from "../../../../../../api/people/organizations-endpoints";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../utils/notificationToast";

import {
	get_organization_by_code,
	get_organization_types,
} from "../../../../../../api/people/organizations-endpoints";

import {
	get_activities,
	get_practices,
	get_sectors,
} from "../../../../../../api/people/general";

import { get_countries } from "../../../../../../api/location/location-endpoints";
import moment from "moment";

const { Option } = Select;

export default function SearchOrganization({ onSearch }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [advancedSearch, setAdvancedSearch] = useState(false);
	const [countries, setCountries] = useState([]);
	const [organizationTypes, setOrganizationTypes] = useState([]);
	const [sectors, setSectors] = useState([]);
	const [activities, setActivities] = useState([]);
	const [practices, setPractices] = useState([]);
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

		const fetch_organization_types = async () => {
			const data = await get_organization_types();
			setOrganizationTypes(data.values || []);
		};

		const fetch_sectors = async () => {
			const data = await get_sectors();
			setSectors(data.values || []);
		};

		fetch_organization_types();
		fetch_countries();
		fetch_sectors();
	}, []);

	const fetch_activities = async (s) => {
		const data = await get_activities(s);
		setActivities(data.values || []);
	};

	const fetch_practices = async (a) => {
		const data = await get_practices(a);
		setPractices(data.values || []);
	};

	const onFinish = async (values) => {
		try {
			if (!values.name && !values.identificationValue) {
				setError(true);
				return;
			}

			setSubmitting(true);

			const res = await search_organization({
				name: values.name?.trim() || null,
				identificationValue: values.identificationValue?.trim() || null,
				foundationDate: values.foundationDate
					? moment(values.foundationDate).format("YYYY-MM-DD")
					: null,
				hostCountryCode: values.hostCountryCode || null,
				typeCode: values.typeCode || null,
				identificationTypeCode: values.identificationTypeCode || null,
				isic: values.practice || null,
				activityCode: values.activity || null,
				sectorCode: values.sector || null,
			});
			const organizations = res?.values?.map((organization) => {
				return {
					key: organization.code,
					name: organization.name,
					identificationsValue:
						values.identificationValue ||
						organization.identifications?.values[0]?.value ||
						null,
					identificationsType:
						values.identificationsType ||
						organization.identifications?.values?.filter(
							(i) =>
								i.value === values.identificationValue ||
								!values.identificationValue
						)[0]?.type?.name ||
						null,
				};
			});

			const totalRows = res?.total;

			onSearch(organizations, totalRows);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	const onSectorChange = async (value) => {
		form.setFieldsValue({ activity: null });
		form.setFieldsValue({ practice: null });
		setPractices([]);
		setActivities([]);
		if (!value) {
			return;
		}
		fetch_activities(value);
	};

	const onActivityChange = async (value) => {
		form.setFieldsValue({ practice: null });
		setPractices([]);
		if (!value) {
			return;
		}
		fetch_practices(value);
	};

	return (
		<Inner>
			<WarningMessage error={error}>
				{/* Es obligatorio completar Razon Social o Nro de Identificacion 
        para realizar una busqueda */}
				{t("bussines-name-identification-required-lbl")}
			</WarningMessage>
			<Form
				form={form}
				name="search-organization-form"
				layout="vertical"
				onFinish={onFinish}
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
								max: 50,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Input />
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
								max: 50,
								message: t("maximum-character-lbl", 50),
							},
						]}
					>
						<Input />
					</Form.Item>
				</FloatingLabel>

				<AdvancedSearch>
					{advancedSearch ? (
						<React.Fragment>
							<Message>{t("optional-field-advance-search-lbl")}</Message>
							<FloatingLabel
								label={t("organization-type-lbl")}
								value={formValues?.typeCode}
								hint={t("organization-type-hint")}
							>
								<Form.Item name="typeCode">
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
								<Form.Item name="hostCountryCode">
									<Select allowClear={true}>
										{countries.map((country) => (
											<Option key={country.code} value={country.code}>
												{country.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>

							<FloatingLabel
								label={t("foundation-date-lbl")}
								value={formValues?.foundationDate}
								hint={t("foundation-date-hint")}
							>
								<Form.Item name="foundationDate">
									<DatePicker
										format="DD/MM/YYYY"
										placeholder=""
										style={{ width: "100%" }}
									/>
								</Form.Item>
							</FloatingLabel>

							<FloatingLabel label={t("sector-lbl")} value={formValues?.sector}>
								<Form.Item name="sector">
									<Select allowClear={true} onChange={onSectorChange}>
										{sectors.map((sc) => (
											<Option key={sc.code} value={sc.code}>
												{sc.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>

							<FloatingLabel
								label={t("activity-lbl")}
								value={formValues?.activity}
								hint={t("sector-hint")}
							>
								<Form.Item name="activity">
									<Select
										allowClear={true}
										disabled={activities.length <= 0}
										onChange={onActivityChange}
									>
										{activities.map((ac) => (
											<Option key={ac.code} value={ac.code}>
												{ac.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>

							<FloatingLabel
								label={t("practice-lbl")}
								value={formValues?.practice}
								hint={t("practice-hint")}
							>
								<Form.Item name="practice">
									<Select allowClear={true} disabled={practices.length <= 0}>
										{practices.map((pc) => (
											<Option key={pc.isicCode} value={pc.isicCode}>
												{pc.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</React.Fragment>
					) : null}
					<AdvancedSearchButton
						type="link"
						onClick={() => setAdvancedSearch((prev) => !prev)}
					>
						{advancedSearch ? t("simple-search-lbl") : t("advanced-search-lbl")}
						{advancedSearch ? <BsChevronUp /> : <BsChevronDown />}
					</AdvancedSearchButton>
				</AdvancedSearch>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={submitting}>
						{t("search-btn")}
					</Button>
				</Form.Item>
			</Form>
		</Inner>
	);
}

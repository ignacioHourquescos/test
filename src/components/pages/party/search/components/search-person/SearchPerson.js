import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Collapse } from "antd";
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
import { search_person } from "../../../../../../api/people/people-endpoints";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../utils/notificationToast";

import {
	get_genders,
	get_marital_statuses,
	get_economic_classes,
	get_worker_types,
} from "../../../../../../api/people/people-endpoints";

import { get_countries } from "../../../../../../api/location/location-endpoints";

import {
	get_activities,
	get_practices,
	get_sectors,
} from "../../../../../../api/people/general";
import moment from "moment";

const { Option } = Select;

export default function SearchPerson({ onSearch }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [advancedSearch, setAdvancedSearch] = useState(false);
	const [genders, setGenders] = useState([]);
	const [maritalStatuses, setMaritalStatuses] = useState([]);
	const [countries, setCountries] = useState([]);
	const [workerTypes, setWorkerTypes] = useState([]);
	const [economicClasses, setEconomicClasses] = useState([]);
	const [sectors, setSectors] = useState([]);
	const [activities, setActivities] = useState([]);
	const [practices, setPractices] = useState([]);
	const [error, setError] = useState(false);

	const formValues = Form.useWatch([], form);

	useEffect(() => {
		if (formValues?.lastName || formValues?.identificationValue)
			setError(false);
	}, [formValues]);

	useEffect(() => {
		const fetch_genders = async () => {
			const data = await get_genders();
			setGenders(data.values || []);
		};

		const fetch_marital_statuses = async () => {
			const data = await get_marital_statuses();
			setMaritalStatuses(data.values || []);
		};

		const fetch_countries = async () => {
			const data = await get_countries();
			setCountries(data.countries || []);
		};

		const fetch_worker_types = async () => {
			const data = await get_worker_types();
			setWorkerTypes(data.values || []);
		};

		const fetch_economic_classes = async () => {
			const data = await get_economic_classes();
			setEconomicClasses(data.values || []);
		};

		const fetch_sectors = async () => {
			const data = await get_sectors();
			setSectors(data.values || []);
		};

		fetch_genders();
		fetch_marital_statuses();
		fetch_countries();
		fetch_worker_types();
		fetch_economic_classes();
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
			if (!values.lastName && !values.identificationValue) {
				setError(true);
				return;
			}

			setSubmitting(true);

			const res = await search_person({
				lastName: values.lastName?.trim() || null,
				identificationValue: values?.identificationValue?.trim() || null,
				firstName: values.firstName?.trim() || null,
				genderCode: values.genderCode || null,
				maritalStatusCode: values.maritalStatusCode || null,
				residenceCountryCode: values.residenceCountryCode || null,
				birthDate: values.birthdate
					? moment(values.birthdate).format("YYYY-MM-DD")
					: null,
				workerType: values.workerType || null,
				economicClasses: values.economicClass || null,
				sector: values.sector || null,
				activity: values.activity || null,
				practice: values.practice || null,
			});
			const people = res?.values?.map((person) => {
				return {
					key: person.code,
					firstName: person.firstName,
					lastName: person.lastName,
					identificationsValue:
						values.identificationValue ||
						person.identifications?.values[0]?.value ||
						null,
					identificationsType:
						values.identificationsType ||
						person.identifications?.values?.filter(
							(i) =>
								i.value === values.identificationValue ||
								!values.identificationValue
						)[0]?.type?.name ||
						null,
				};
			});

			const totalRows = res?.total;
			onSearch(people, totalRows);
		} catch (error) {
			console.error(error);
			console.log(error);
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
				{t("Last-name-identification-required-lbl")}
			</WarningMessage>
			<Form
				form={form}
				name="search-person"
				layout="vertical"
				onFinish={onFinish}
			>
				<FloatingLabel
					label={t("last-name-lbl")}
					value={formValues?.lastName}
					hint={t("last-name-hint")}
				>
					<Form.Item
						name="lastName"
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

				<AdvancedSearchButton
					type="link"
					onClick={() => setAdvancedSearch((prev) => !prev)}
				>
					{advancedSearch ? t("simple-search-lbl") : t("advanced-search-lbl")}
					{advancedSearch ? <BsChevronUp /> : <BsChevronDown />}
				</AdvancedSearchButton>

				<AdvancedSearch>
					{advancedSearch ? (
						<React.Fragment>
							<Message>{t("optional-field-advance-search-lbl")}</Message>
							<FloatingLabel
								label={t("name-lbl")}
								value={formValues?.firstName}
								hint={t("name-hint")}
							>
								<Form.Item
									name="firstName"
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
								label={t("gender-lbl")}
								value={formValues?.genderCode}
								hint={t("gender-hint")}
							>
								<Form.Item name="genderCode" rules={[]}>
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
								label={t("civil-status-lbl")}
								value={formValues?.maritalStatusCode}
								hint={t("civil-status-hint")}
							>
								<Form.Item name="maritalStatusCode" rules={[]}>
									<Select allowClear={true}>
										{maritalStatuses.map((maritalStatus) => (
											<Option
												key={maritalStatus.code}
												value={maritalStatus.code}
											>
												{maritalStatus.name}
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
								<Form.Item name="residenceCountryCode" rules={[]}>
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
								label={t("date-of-birth-lbl")}
								value={formValues?.birthdate}
							>
								<Form.Item name="birthdate">
									<DatePicker
										format="DD/MM/YYYY"
										allowClear={true}
										placeholder=""
										style={{ width: "100%" }}
									/>
								</Form.Item>
							</FloatingLabel>

							<FloatingLabel
								label={t("worker-type-lbl")}
								value={formValues?.workerType}
							>
								<Form.Item name="workerType" rules={[]}>
									<Select allowClear={true}>
										{workerTypes.map((wt) => (
											<Option key={wt.code} value={wt.code}>
												{wt.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>

							<FloatingLabel
								label={t("listing-class-lbl")}
								value={formValues?.economicClass}
								hint={t("listing-class-hint")}
							>
								<Form.Item name="economicClass" rules={[]}>
									<Select allowClear={true}>
										{economicClasses.map((ec) => (
											<Option key={ec.code} value={ec.code}>
												{ec.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>

							<FloatingLabel
								label={t("sector-lbl")}
								value={formValues?.sector}
								hint={t("sector-hint")}
							>
								<Form.Item name="sector" rules={[]}>
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
								hint={t("activity-hint")}
							>
								<Form.Item name="activity" rules={[]}>
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
								<Form.Item name="practice" rules={[]}>
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

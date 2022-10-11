import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select } from "antd";
import DataContainer from "../../data-container/DataContainer";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import { Row, Col } from "antd";
import {
	get_economic_classes,
	get_genders,
	get_marital_statuses,
	get_worker_types,
} from "../../../../../../../api/people/people-endpoints";
import { get_countries } from "../../../../../../../api/location/location-endpoints";
import {
	get_activities,
	get_practices,
	get_sectors,
} from "../../../../../../../api/people/general";
import FloatingLabel from "../../../../../../common/floatingLabel/FloatingLabel";
import moment from "moment";

const { Option } = Select;

const GUTTER = 7;

export default function PersonalInformation({ form }) {
	const { t } = useTranslation();
	const [genders, setGenders] = useState([]);
	const [workerTypes, setWorkerTypes] = useState([]);
	const [economicClasses, setEconomicClasses] = useState([]);
	const [countries, setCountries] = useState([]);
	const [sectors, setSectors] = useState([]);
	const [activities, setActivities] = useState([]);
	const [practices, setPractices] = useState([]);
	const [maritalStatuses, setMaritalStatuses] = useState([]);

	const lastName = Form.useWatch("lastName", form);
	const firstName = Form.useWatch("firstName", form);
	const birthdate = Form.useWatch("birthdate", form);
	const sector = Form.useWatch("sector", form);
	const activity = Form.useWatch("activity", form);
	const practice = Form.useWatch("practice", form);
	const genderCode = Form.useWatch("genderCode", form);
	const maritalStatusCode = Form.useWatch("maritalStatusCode", form);
	const nationality = Form.useWatch("nationality", form);
	const residenceCountryCode = Form.useWatch("residenceCountryCode", form);
	const workerType = Form.useWatch("workerType", form);
	const economicClass = Form.useWatch("economicClass", form);
	const addresses = Form.useWatch("addresses", form);
	const identifications = Form.useWatch("identifications", form);

	const fetch_sectors = async () => {
		const data = await get_sectors();
		setSectors(data.values || []);
	};

	const fetch_activities = async (s) => {
		const data = await get_activities(s);
		setActivities(data.values || []);
	};

	const fetch_practices = async (a) => {
		const data = await get_practices(a);
		setPractices(data.values || []);
	};

	useEffect(() => {
		if (sector) fetch_activities(sector);
	}, [sector]);

	useEffect(() => {
		if (activity) fetch_practices(activity);
	}, [activity]);

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

		fetch_genders();
		fetch_marital_statuses();
		fetch_countries();
		fetch_worker_types();
		fetch_economic_classes();
		fetch_sectors();
	}, []);

	const onCountryChange = async () => {
		form.setFieldsValue({
			addresses: addresses?.map((el) => {
				return { ...el, province: null, city: null, postalCode: null };
			}),
			identifications: identifications?.map((el) => {
				return { ...el, identificationType: null };
			}),
		});
	};

	const onSectorChange = async () => {
		form.setFieldsValue({ activity: null });
		form.setFieldsValue({ practice: null });
		setPractices([]);
	};

	const onActivityChange = async () => {
		form.setFieldsValue({ practice: null });
	};

	const disableFutureDate = (date) => {};

	return (
		<>
			<DataContainer>
				<DataContainer.Section>
					{t("personal-information-subtitle")}
				</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("last-name-subtitle")}
								value={lastName}
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
									<Input disabled />
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={8}>
							<FloatingLabel
								label={t("name-lbl")}
								value={firstName}
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
									<Input disabled />
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("date-of-birth-lbl")}
								value={birthdate}
								hint={t("date-of-birth-hint")}
							>
								<Form.Item name="birthdate">
									<DatePicker
										format="DD/MM/YYYY"
										allowClear={true}
										placeholder=""
										style={{ width: "100%" }}
										disabledDate={(currentDate) =>
											disableFutureDate(currentDate)
										}
									/>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>

					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("gender-lbl")}
								value={genderCode}
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
									<Select allowClear={true} disabled>
										{genders.map((gender) => (
											<Option key={gender.code} value={gender.code}>
												{gender.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("civil-status-lbl")}
								value={maritalStatusCode}
								hint={t("civil-status-hint")}
							>
								<Form.Item name="maritalStatusCode">
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
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("nationality-lbl")}
								value={nationality}
								hint={t("nationality-hint")}
							>
								<Form.Item name="nationality">
									<Select allowClear={true}>
										{countries.map((country) => (
											<Option key={country.code} value={country.code}>
												{country.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("country-of-residence-lbl")}
								value={residenceCountryCode}
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
									<Select allowClear={true} onChange={onCountryChange} disabled>
										{countries.map((country) => (
											<Option key={country.code} value={country.code}>
												{country.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>

			<DataContainer>
				<DataContainer.Section>
					{t("labor-data-subtitle")}
				</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("worker-type-lbl")}
								value={workerType}
								hint={t("worker-type-hint")}
							>
								<Form.Item name="workerType">
									<Select allowClear={true}>
										{workerTypes.map((wt) => (
											<Option key={wt.code} value={wt.code}>
												{wt.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("listing-class-lbl")}
								value={economicClass}
								hint={t("listing-class-hint")}
							>
								<Form.Item name="economicClass">
									<Select allowClear={true}>
										{economicClasses.map((ec) => (
											<Option key={ec.code} value={ec.code}>
												{ec.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>

					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("sector-lbl")}
								value={sector}
								hint={t("sector-hint")}
							>
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
						</Col>

						<Col span={8}>
							<FloatingLabel
								label={t("activity-lbl")}
								value={activity}
								hint={t("activity-hint")}
							>
								<Form.Item name="activity">
									<Select
										allowClear={true}
										onChange={onActivityChange}
										disabled={!sector}
									>
										{activities.map((ac) => (
											<Option key={ac.code} value={ac.code}>
												{ac.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={8}>
							<FloatingLabel
								label={t("practice-lbl")}
								value={practice}
								hint={t("practice-hint")}
							>
								<Form.Item name="practice">
									<Select allowClear={true} disabled={!activity}>
										{practices.map((pc) => (
											<Option key={pc.isicCode} value={pc.isicCode}>
												{pc.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
					</Row>
				</DataContainer.Content>
			</DataContainer>
		</>
	);
}

import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Select } from "antd";
import DataContainer from "../../data-container/DataContainer";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import { Row, Col } from "antd";
import { get_countries } from "../../../../../../../api/location/location-endpoints";
import {
	get_activities,
	get_practices,
	get_sectors,
} from "../../../../../../../api/people/general";
import FloatingLabel from "../../../../../../common/floatingLabel/FloatingLabel";
import { get_organization_types } from "../../../../../../../api/people/organizations-endpoints";
import moment from "moment";

const { Option } = Select;

const GUTTER = 7;

export default function OrganizationInformation({ form }) {
	const { t } = useTranslation();
	const [countries, setCountries] = useState([]);
	const [sectors, setSectors] = useState([]);
	const [activities, setActivities] = useState([]);
	const [practices, setPractices] = useState([]);
	const [organizationTypes, setOrganizationTypes] = useState([]);

	const name = Form.useWatch("name", form);
	const foundationDate = Form.useWatch("foundationDate", form);
	const sector = Form.useWatch("sector", form);
	const activity = Form.useWatch("activity", form);
	const practice = Form.useWatch("practice", form);
	const residenceCountryCode = Form.useWatch("residenceCountryCode", form);
	const type = Form.useWatch("type", form);
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

	const disableFutureDate = (date) => {
		return date && date > moment().endOf("day");
	};

	return (
		<>
			<DataContainer>
				<DataContainer.Section>
					{t("organization-data-subtitle")}
				</DataContainer.Section>
				<DataContainer.Content>
					<Row gutter={GUTTER}>
						<Col span={8}>
							<FloatingLabel
								label={t("business-name-lbl")}
								value={name}
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
											max: 100,
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
									<Select allowClear={true} disabled onChange={onCountryChange}>
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
								label={t("organization-type-lbl")}
								value={type}
								hint={t("organization-type-hint")}
							>
								<Form.Item
									name="type"
									rules={[
										{
											required: true,
											message: t("field-required-lbl"),
										},
									]}
								>
									<Select allowClear={true} disabled>
										{organizationTypes.map((organizationType) => (
											<Option
												key={organizationType.code}
												value={organizationType.code}
											>
												{organizationType.name}
											</Option>
										))}
									</Select>
								</Form.Item>
							</FloatingLabel>
						</Col>
						<Col span={8}>
							<FloatingLabel
								label={t("foundation-date-lbl")}
								value={foundationDate}
								hint={t("foundation-date-hint")}
							>
								<Form.Item name="foundationDate">
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
								disabled={!activity}
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

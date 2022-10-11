import React, { useState, useEffect } from "react";
import { Checkbox, Col, Form, Input, Row, Select, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
	get_cities,
	get_postal_codes,
	get_provinces,
} from "../../../../../../../api/location/location-endpoints";
import FloatingLabel from "../../../../../../common/floatingLabel/FloatingLabel";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import COLORS from "../../../../../../common/theme/colors";

const GUTTER = 7;

const { Option } = Select;
const { TextArea } = Input;

export default function Address({
	form,
	name,
	addresses,
	addressesTypes,
	remove,
	...restField
}) {
	const { t } = useTranslation();
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const [postalCodes, setPostalCodes] = useState([]);
	const [isDpt, setIsDpt] = useState(false);

	const residenceCountryCode = Form.useWatch("residenceCountryCode", form);
	const province = Form.useWatch(
		["addresses", restField.fieldKey, "province"],
		form
	);
	const city = Form.useWatch(["addresses", restField.fieldKey, "city"], form);

	const floor = Form.useWatch(["addresses", restField.fieldKey, "floor"], form);
	const apartment = Form.useWatch(
		["addresses", restField.fieldKey, "apartment"],
		form
	);

	useEffect(() => {
		if (floor || apartment) setIsDpt(true);
	}, [floor, apartment]);

	const fetch_provinces = async (country) => {
		const data = await get_provinces(country);
		setProvinces(data.provinces || []);
	};

	const fetch_cities = async (p) => {
		const data = await get_cities(p);
		setCities(data.cities || []);
	};

	const fetch_postal_codes = async (c) => {
		const data = await get_postal_codes(c);
		setPostalCodes(data.values || []);
	};

	useEffect(() => {
		if (province) fetch_cities(province);
	}, [province]);

	useEffect(() => {
		if (city) fetch_postal_codes(city);
	}, [city]);

	useEffect(() => {
		if (residenceCountryCode) {
			setCities([]);
			setPostalCodes([]);
			fetch_provinces(residenceCountryCode);
		}
	}, [residenceCountryCode]);

	const onProvinceChange = async (value) => {
		form.setFieldsValue({
			addresses: addresses.map((a, idx) =>
				idx === restField.fieldKey
					? { ...a, province: value, city: null, postalCode: null }
					: a
			),
		});
		setPostalCodes([]);
	};

	const onCityChange = async (value) => {
		form.setFieldsValue({
			addresses: addresses.map((a, idx) =>
				idx === restField.fieldKey ? { ...a, city: value, postalCode: null } : a
			),
		});
	};

	return (
		<Col className="relative">
			<Row gutter={GUTTER}>
				<Col span={8}>
					<FloatingLabel
						label={t("type-of-address-lbl")}
						value={addresses && addresses?.[name]?.addressType}
						hint={t("type-of-address-hint")}
					>
						<Form.Item
							{...restField}
							name={[name, "addressType"]}
							rules={[
								{
									required: true,
									message: t("field-required-lbl"),
								},
							]}
						>
							<Select allowClear={true}>
								{addressesTypes.map((type) => (
									<Option key={type.code} value={type.code}>
										{type.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</FloatingLabel>
				</Col>
				<FloatingLabel hint={t("remove-hint")}>
					<CloseCircleOutlined
						style={{
							marginLeft: "10px",
							paddingTop: "10px",
							color: COLORS.RED,
						}}
						onClick={() => remove(name)}
					/>
				</FloatingLabel>
			</Row>
			<Row gutter={GUTTER}>
				<Col span={8}>
					<FloatingLabel
						label={t("street-lbl")}
						value={addresses && addresses?.[name]?.street}
						hint={t("street-hint")}
					>
						<Form.Item
							{...restField}
							name={[name, "street"]}
							rules={[
								{
									required: true,
									message: t("field-required-lbl"),
								},
								{
									max: 100,
									message: t("maximum-character-lbl", 100),
								},
							]}
						>
							<Input />
						</Form.Item>
					</FloatingLabel>
				</Col>
				<Col span={4}>
					<FloatingLabel
						label={t("number-lbl")}
						value={addresses && addresses?.[name]?.addressNumber}
						hint={t("number-hint")}
					>
						<Form.Item
							{...restField}
							name={[name, "addressNumber"]}
							rules={[
								{
									required: true,
									message: t("field-required-lbl"),
								},
								{
									pattern: /^\d+$/,
									message: t("number-format-lbl"),
								},
							]}
						>
							<Input type="number" />
						</Form.Item>
					</FloatingLabel>
				</Col>
				<Col span={4}>
					<FloatingLabel hint={t("it-is-deparment-hint")}>
						<Checkbox
							checked={isDpt}
							onChange={(e) => setIsDpt(e.target.checked)}
						>
							{t("is-it-dept-btn")}
						</Checkbox>
					</FloatingLabel>
				</Col>

				{isDpt && (
					<>
						<Col span={4}>
							<FloatingLabel
								label={t("flat-lbl")}
								value={addresses && addresses?.[name]?.floor}
								hint={t("flat-hint")}
							>
								<Form.Item
									{...restField}
									name={[name, "floor"]}
									rules={[
										{
											max: 10,
											message: t("maximum-character-lbl", 10),
										},
										{
											pattern: /^\d+$/,
											message: t("number-format-lbl"),
										},
									]}
								>
									<Input type="number" />
								</Form.Item>
							</FloatingLabel>
						</Col>

						<Col span={4}>
							<FloatingLabel
								label={t("dept-lbl")}
								value={addresses && addresses?.[name]?.dpto}
								hint={t("dept-hint")}
							>
								<Form.Item
									{...restField}
									name={[name, "dpto"]}
									rules={[
										{
											max: 5,
											message: t("maximum-character-lbl", 5),
										},
									]}
								>
									<Input style={{ textTransform: "uppercase" }} />
								</Form.Item>
							</FloatingLabel>
						</Col>
					</>
				)}
			</Row>

			<Row gutter={GUTTER}>
				<Col span={8}>
					<FloatingLabel
						label={t("province-lbl")}
						value={addresses && addresses?.[name]?.province}
						hint={t("province-hint")}
					>
						<Form.Item
							{...restField}
							name={[name, "province"]}
							rules={[
								{
									required: true,
									message: t("field-required-lbl"),
								},
							]}
						>
							<Select
								allowClear={true}
								onChange={onProvinceChange}
								disabled={!residenceCountryCode}
							>
								{provinces.map((province) => (
									<Option key={province.code} value={province.code}>
										{province.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</FloatingLabel>
				</Col>

				<Col span={8}>
					<FloatingLabel
						label={t("city-lbl")}
						value={addresses && addresses?.[name]?.city}
						hint={t("city-hint")}
					>
						<Form.Item
							{...restField}
							name={[name, "city"]}
							rules={[
								{
									required: true,
									message: t("field-required-lbl"),
								},
							]}
						>
							<Select
								allowClear={true}
								onChange={onCityChange}
								disabled={!province}
							>
								{cities.map((city) => (
									<Option key={city.code} value={city.code}>
										{city.name}
									</Option>
								))}
							</Select>
						</Form.Item>
					</FloatingLabel>
				</Col>

				<Col span={8}>
					<FloatingLabel
						label={t("postal-code-lbl")}
						value={addresses && addresses?.[name]?.postalCode}
						hint={t("postal-code-hint")}
					>
						<Form.Item
							{...restField}
							name={[name, "postalCode"]}
							rules={[
								{
									required: true,
									message: t("field-required-lbl"),
								},
							]}
						>
							<Select allowClear={true} disabled={!city}>
								{postalCodes.map((postalCode) => (
									<Option key={postalCode.number} value={postalCode.number}>
										{postalCode.number}
									</Option>
								))}
							</Select>
						</Form.Item>
					</FloatingLabel>
				</Col>
			</Row>

			<Row gutter={GUTTER}>
				<Col span={24}>
					<FloatingLabel
						label={t("observations-lbl")}
						value={addresses && addresses?.[name]?.observations}
						hint={t("observations-hint")}
					>
						<Form.Item
							{...restField}
							name={[name, "observations"]}
							rules={[
								{
									max: 500,
									message: t("maximum-character-lbl", 500),
								},
							]}
						>
							<TextArea />
						</Form.Item>
					</FloatingLabel>
				</Col>
			</Row>
		</Col>
	);
}

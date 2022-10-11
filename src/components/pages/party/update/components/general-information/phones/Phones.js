import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import {
	CloseCircleOutlined,
	Popconfirm,
	PlusOutlined,
	message,
} from "@ant-design/icons";
import DataContainer from "../../data-container/DataContainer";
import { get_phone_types } from "../../../../../../../api/people/general";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../common/floatingLabel/FloatingLabel";
import COLORS from "../../../../../../common/theme/colors";

const { Option } = Select;

const GUTTER = 7;
const SECTION_NAME = "phones";

export default function Phones({ form }) {
	const { t } = useTranslation();
	const [phoneTypes, setPhoneTypes] = useState([]);

	const phones = Form.useWatch(SECTION_NAME, form);

	useEffect(() => {
		const fetch_phone_types = async () => {
			const data = await get_phone_types();
			setPhoneTypes(data.values || []);
		};

		fetch_phone_types();
	}, []);

	return (
		<DataContainer>
			<DataContainer.Section>{t("phone-subtitle")}</DataContainer.Section>
			<DataContainer.Content>
				<Form.List name={SECTION_NAME}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Col className="relative" key={key}>
									<Row gutter={GUTTER}>
										<Col span={8}>
											<FloatingLabel
												label={t("phone-type-lbl")}
												value={phones && phones?.[name]?.phoneType}
												hint={t("phone-type-hint")}
											>
												<Form.Item
													{...restField}
													name={[name, "phoneType"]}
													rules={[
														{
															required: true,
															message: t("field-required-lbl"),
														},
													]}
												>
													<Select allowClear={true}>
														{phoneTypes.map((type) => (
															<Option key={type.code} value={type.code}>
																{type.name}
															</Option>
														))}
													</Select>
												</Form.Item>
											</FloatingLabel>
										</Col>

										<Col span={3}>
											<FloatingLabel
												label={t("country-code-lbl")}
												value={true}
												hint={t("country-code-hint")}
											>
												<Form.Item
													{...restField}
													name={[name, "areaCode"]}
													rules={[
														{
															required: true,
															message: t("field-required-lbl"),
														},
														{
															max: 3,
															message: t("maximum-character-lbl", 3),
														},
													]}
												>
													<Input type="number" addonBefore="+" />
												</Form.Item>
											</FloatingLabel>
										</Col>

										<Col span={3}>
											<FloatingLabel
												label={t("area-code-lbl")}
												value={phones && phones?.[name]?.locationCode}
												hint={t("area-code-hint")}
											>
												<Form.Item
													{...restField}
													name={[name, "locationCode"]}
													rules={[
														{
															required: true,
															message: t("field-required-lbl"),
														},
														{
															max: 10,
															message: t("maximum-character-lbl", 10),
														},
													]}
												>
													<Input type="number" />
												</Form.Item>
											</FloatingLabel>
										</Col>

										<Col span={4}>
											<FloatingLabel
												label={t("telephone-lbl")}
												value={phones && phones?.[name]?.phone}
												hint={t("telephone-hint")}
											>
												<Form.Item
													{...restField}
													name={[name, "phone"]}
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
													<Input type="number" />
												</Form.Item>
											</FloatingLabel>
										</Col>

										<Col span={3}>
											<FloatingLabel
												label={t("internal-lbl")}
												value={phones && phones?.[name]?.intern}
												hint={t("internal-hint")}
											>
												<Form.Item
													{...restField}
													name={[name, "intern"]}
													rules={[
														{
															max: 10,
															message: t("maximum-character-lbl", 10),
														},
													]}
												>
													<Input type="number" />
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
								</Col>
							))}
							<Form.Item>
								<Button
									type="link"
									onClick={() => add()}
									icon={<PlusOutlined />}
								>
									{t("add-btn")}
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</DataContainer.Content>
		</DataContainer>
	);
}

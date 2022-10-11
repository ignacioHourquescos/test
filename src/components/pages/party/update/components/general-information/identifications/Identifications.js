import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { get_identification_types } from "../../../../../../../api/people/general";
import DataContainer from "../../data-container/DataContainer";
import FloatingLabel from "../../../../../../common/floatingLabel/FloatingLabel";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import COLORS from "../../../../../../common/theme/colors";
const GUTTER = 7;
const { Option } = Select;

const SECTION_NAME = "identifications";

export default function Identifications({ personType, form }) {
	const { t } = useTranslation();
	const [identificationTypes, setIdentificationTypes] = useState([]);

	const residenceCountryCode = Form.useWatch("residenceCountryCode", form);
	const identifications = Form.useWatch("identifications", form);

	useEffect(() => {
		const fetch_identification_types = async () => {
			const data = await get_identification_types(
				personType,
				residenceCountryCode
			);
			setIdentificationTypes(data.values || []);
		};

		if (residenceCountryCode) {
			fetch_identification_types();
		}
	}, [residenceCountryCode]);

	return (
		<DataContainer>
			<DataContainer.Section>
				{t("identifications-title")}
			</DataContainer.Section>
			<DataContainer.Content>
				<Form.List name={SECTION_NAME}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Col className="relative" key={key}>
									<Row gutter={GUTTER}>
										<Col span={8}>
											<FloatingLabel
												label={t("id-type-lbl")}
												hint={t("id-type-hint")}
												value={
													identifications &&
													identifications?.[name]?.identificationType
												}
											>
												<Form.Item
													{...restField}
													name={[name, "identificationType"]}
													rules={[
														{
															required: true,
															message: t("field-required-lbl"),
														},
													]}
												>
													<Select
														allowClear={true}
														disabled={
															!residenceCountryCode ||
															(identifications &&
																identifications?.[name]?.disabled)
														}
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
										</Col>

										<Col span={8}>
											<FloatingLabel
												label={t("identification-number-lbl")}
												hint={t("identification-number-hint")}
												value={
													identifications &&
													identifications?.[name]?.identificationValue
												}
											>
												<Form.Item
													{...restField}
													name={[name, "identificationValue"]}
													rules={[
														{
															required: true,
															message: t("field-required-lbl"),
														},
													]}
												>
													<Input
														disabled={
															!(
																identifications &&
																identifications?.[name]?.identificationType
															) ||
															(identifications &&
																identifications?.[name]?.disabled)
														}
													/>
												</Form.Item>
											</FloatingLabel>
										</Col>
										<FloatingLabel hint={t("remove-hint")}>
											{identifications && !identifications?.[name]?.disabled && (
												<CloseCircleOutlined
													style={{
														marginLeft: "10px",
														paddingTop: "10px",
														color: COLORS.RED,
													}}
													onClick={() => remove(name)}
												/>
											)}
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

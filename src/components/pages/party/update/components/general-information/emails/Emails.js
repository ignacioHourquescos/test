import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import DataContainer from "../../data-container/DataContainer";
import { get_mail_types } from "../../../../../../../api/people/general";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../common/floatingLabel/FloatingLabel";
import COLORS from "../../../../../../common/theme/colors";

const { Option } = Select;
const GUTTER = 7;
const SECTION_NAME = "emails";

export default function Emails({ form }) {
	const { t } = useTranslation();
	const [emailTypes, setEmailTypes] = useState([]);

	const emails = Form.useWatch(SECTION_NAME, form);

	useEffect(() => {
		const fetch_mail_types = async () => {
			const data = await get_mail_types();
			setEmailTypes(data.values || []);
		};

		fetch_mail_types();
	}, []);

	return (
		<DataContainer>
			<DataContainer.Section>{t("email-subtitle")}</DataContainer.Section>
			<DataContainer.Content>
				<Form.List name={SECTION_NAME}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Col className="relative" key={key}>
									<Row gutter={GUTTER}>
										<Col span={8}>
											<FloatingLabel
												label={t("email-type-lbl")}
												value={emails && emails?.[name]?.emailType}
												hint={t("email-type-hint")}
											>
												<Form.Item
													{...restField}
													name={[name, "emailType"]}
													rules={[
														{
															required: true,
															message: "Este campo es obligatorio",
														},
													]}
												>
													<Select allowClear={true}>
														{emailTypes.map((type) => (
															<Option key={type.code} value={type.code}>
																{type.name}
															</Option>
														))}
													</Select>
												</Form.Item>
											</FloatingLabel>
										</Col>

										<Col span={8}>
											<FloatingLabel
												label={t("email-lbl")}
												value={emails && emails?.[name]?.email}
												hint={t("email-hint")}
											>
												<Form.Item
													{...restField}
													name={[name, "email"]}
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
													<Input type="email" />
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

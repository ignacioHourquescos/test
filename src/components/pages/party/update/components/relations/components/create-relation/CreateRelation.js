import React, { useState } from "react";
import { Inner } from "./styles";
import { Form, Button, Select } from "antd";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { add_relation_with_existing_party } from "../../../../../../../../api/people/general";

const { Option } = Select;

export default function CreateRelation({
	code,
	selectedParty,
	relationTypes,
	onCreated,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const relationType = Form.useWatch("relationType", form);

	const onFinish = async (values) => {
		try {
			setSubmitting(true);
			await add_relation_with_existing_party(code, {
				partyCode: selectedParty.key,
				typeCode: values.relationType,
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

	if (!relationTypes) return <div>Loading...</div>;

	return (
		<Inner>
			<Form
				form={form}
				name="create-relation-form"
				layout="vertical"
				onFinish={onFinish}
			>
				<FloatingLabel
					label={t("relationship-lbl")}
					value={relationType}
					hint={t("relationship-hint")}
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

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={submitting}>
						{t("add-btn")}
					</Button>
				</Form.Item>
			</Form>
		</Inner>
	);
}

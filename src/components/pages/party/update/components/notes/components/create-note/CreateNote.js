import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import {
	get_notes,
	update_notes,
} from "../../../../../../../../api/people/general";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateNote = ({ notes, code, onResult }) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	const formValues = Form.useWatch([], form);

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			await update_notes(code, {
				values: [
					...notes.map((n) => {
						return { title: n.title, content: n.content };
					}),
					{
						title: values.title,
						content: values.content,
					},
				],
			});

			const result = await get_notes(code);

			if (!result) {
				onResult();
			}

			onResult(result);

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-created-note-title-ok"),
				t("notification-created-note-long-ok")
			);

			form.resetFields();
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form form={form} onFinish={onFinish}>
			<FloatingLabel
				label={t("note-title-lbl")}
				hint={t("note-title-hint")}
				value={formValues?.title}
			>
				<Form.Item
					name={"title"}
					rules={[
						{
							required: true,
							message: t("field-required-lbl"),
						},
						{
							max: 50,
							message: t("maximum-character-lbl", 100),
						},
					]}
				>
					<Input type="text" />
				</Form.Item>
			</FloatingLabel>

			<FloatingLabel
				label={t("observations-note-lbl")}
				hint={t("observations-note-hint")}
				className="mb-6"
				value="true"
			>
				<Form.Item
					name="content"
					rules={[
						{
							required: true,
							message: t("field-required-lbl"),
						},
						{
							max: 400,
							message: t("maximum-character-lbl", 400),
						},
					]}
				>
					<ReactQuill
						theme="snow"
						style={{ height: "250px", marginBottom: "50px" }}
					/>
				</Form.Item>
			</FloatingLabel>

			<Form.Item>
				<Button type="primary" htmlType="submit" loading={submitting}>
					{t("add-btn")}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateNote;

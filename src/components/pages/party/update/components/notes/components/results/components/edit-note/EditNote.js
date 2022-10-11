import React, { useState } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import FloatingLabel from "../../../../../../../../../common/floatingLabel/FloatingLabel";
import {
	get_notes,
	update_notes,
} from "../../../../../../../../../../api/people/general";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../../../utils/notificationToast";
import { Inner } from "./styles";
import { useTranslation } from "../../../../../../../../../../contexts/translationContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditNote({
	notes,
	code,
	onResult,
	onCancel,
	note,
	index,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	const formValues = Form.useWatch([], form);

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			await update_notes(code, {
				values: [
					...notes.map((n, idx) =>
						idx === index
							? {
									title: values.title,
									content: values.content,
							  }
							: {
									title: n.title,
									content: n.content,
							  }
					),
				],
			});

			const result = await get_notes(code);

			if (!result) {
				onResult();
			}

			onResult(result);

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-edited-note-title-ok"),
				t("notification-edited-note-long-ok")
			);
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Inner>
			<Form form={form} onFinish={onFinish} initialValues={note}>
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
								message: t("maximum-character-lbl", 400),
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

				<Row gutter={8}>
					<Col>
						<Form.Item>
							<Button type="primary" htmlType="submit" loading={submitting}>
								{t("add-btn")}
							</Button>
						</Form.Item>
					</Col>
					<Col>
						<Form.Item>
							<Button
								type="secondary"
								htmlType="submit"
								loading={submitting}
								onClick={onCancel}
							>
								{t("cancel-btn")}
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Inner>
	);
}

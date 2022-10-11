import React, { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, message, Upload, Button, Select } from "antd";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import { update_files } from "../../../../../../../../api/people/general";
import { Error, FileInfo, FileName, Meta, RemoveFileBtn } from "./styles";

const { Dragger } = Upload;
const { Option } = Select;

const getBase64 = (file, callback) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(file);
};

export default function UploadFile({ tags, files, code, onResult }) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [base64, setBase64] = useState(null);
	const [file, setFile] = useState(null);

	const formValues = Form.useWatch([], form);

	const reset = () => {
		setBase64(null);
		setFile(null);
	};

	const handleUploadChange = (info) => {
		try {
			getBase64(
				info.fileList[info.fileList.length - 1].originFileObj,
				(b64) => {
					setBase64(b64);
					setFile(info.fileList[info.fileList.length - 1]);
					console.log(b64);
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			const uploadfile = {
				name: file.name,
				content: base64.split(",")[1],
				labels: values.tags?.map((tag) => {
					return { name: tag };
				}) || [{ name: "" }],
			};

			await update_files(code, {
				values: [
					...files.map((f) => {
						return {
							name: f.name,
							labels: f.labels.values,
						};
					}),
					uploadfile,
				],
			});

			onResult();
			reset();

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-file-up-title-ok"),
				t("notification-file-up-long-ok", file?.name)
			);

			form.resetFields();
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<Form form={form} onFinish={onFinish}>
				{!file ? (
					<Form.Item name="file">
						<Dragger
							multiple={false}
							beforeUpload={() => false}
							onChange={handleUploadChange}
							action={null}
							showUploadList={false}
						>
							<p className="ant-upload-drag-icon">
								<InboxOutlined />
							</p>
							<p className="ant-upload-text">
								{t("drag-or-select-file-subtitle")}
							</p>
							<p className="ant-upload-hint">{t("one-file-at-time-lbl")}</p>
						</Dragger>
					</Form.Item>
				) : (
					<FileInfo>
						<FileName>{file?.name}</FileName>
						<Meta>{(file?.size / (1024 * 1024)).toFixed(2)}Mb</Meta>
						{(file?.size / (1024 * 1024)).toFixed(2) > 5 ? (
							<Error>{t("maximum-file-size-5mb-lbl")}</Error>
						) : null}
						<RemoveFileBtn type="link" onClick={reset}>
							{t("remove-btn")}
						</RemoveFileBtn>
					</FileInfo>
				)}

				<FloatingLabel label={t("Tags")} value={formValues?.tags}>
					<Form.Item name="tags">
						<Select
							mode="tags"
							allowClear
							className="w-full"
							placeholder=""
							tokenSeparators={[",", ";", " "]}
						>
							{tags?.map((l, idx) => (
								<Option key={`label_${idx}`}>{l}</Option>
							))}
						</Select>
					</Form.Item>
				</FloatingLabel>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={submitting}
						disabled={
							(file?.size / (1024 * 1024)).toFixed(2) > 5 ? true : false
						}
					>
						{t("add-file-subtitle")}
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

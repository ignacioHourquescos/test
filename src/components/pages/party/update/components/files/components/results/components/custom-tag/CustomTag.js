import React from "react";
import { Popconfirm } from "antd";
import { Inner, IconHover, Close, Content, Tags, Tag, Title } from "./styles";
import { CloudDownloadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { get_file } from "../../../../../../../../../../api/people/general";
import FloatingLabel from "../../../../../../../../../common/floatingLabel/FloatingLabel";
import { useTranslation } from "../../../../../../../../../../contexts/translationContext";
import COLORS from "../../../../../../../../../common/theme/colors";

function downloadB64(fileName, b64) {
	const linkSource = `data:application/pdf;base64,${b64}`;
	const downloadLink = document.createElement("a");

	downloadLink.href = linkSource;
	downloadLink.download = fileName;
	downloadLink.click();
}

export default function CustomTag({ partyCode, file, onDelete }) {
	const { t } = useTranslation();

	const download = async () => {
		const f = await get_file(partyCode, file.code);
		downloadB64(f.name, f.content);
	};

	return (
		<Inner>
			<FloatingLabel hint={t("download-file-hint")}>
				<IconHover>
					<Popconfirm
						title={t("are-you-sure-you-want-to-download-this-file-subtitle")}
						onConfirm={download}
						okText={t("yes-btn")}
						cancelText={t("no-btn")}
					>
						<CloudDownloadOutlined />
					</Popconfirm>
					{/* <CloudDownloadOutlined onClick={download} /> */}
				</IconHover>
			</FloatingLabel>

			<Content>
				<Title>{file.name}</Title>
				{file.labels && file.labels.values && (
					<Tags>
						{file.labels.values.map((t, idx) => (
							<Tag key={`label_${idx}`}>{t.name}</Tag>
						))}
					</Tags>
				)}
			</Content>
			<FloatingLabel hint={t("remove-hint")}>
				<Close>
					<Popconfirm
						title={t("are-you-sure-you-want-to-remove-subtitle")}
						onConfirm={() => onDelete(file)}
						okText={t("yes-btn")}
						cancelText={t("no-btn")}
					>
						<CloseCircleOutlined
							style={{
								marginLeft: "10px",
								color: COLORS.RED,
							}}
						/>
					</Popconfirm>
				</Close>
			</FloatingLabel>
		</Inner>
	);
}

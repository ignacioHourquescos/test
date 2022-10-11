import React from "react";
import { Inner } from "./styles";
import CustomTag from "./components/custom-tag/CustomTag";
import { update_files } from "../../../../../../../../api/people/general";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { SkeletonComponent } from "./components/skeleton-component/SkeletonComponent";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

const Results = ({ code, files, onResult }) => {
	const { t } = useTranslation();

	if (!files) return <SkeletonComponent />;
	if (files.length === 0) return <div>{t("no-information-available-lbl")}</div>;

	const handleDelete = async (file) => {
		try {
			await update_files(code, {
				values: [
					...files
						.filter((f) => f.code !== file.code)
						.map((f) => {
							return {
								name: f.name,
								labels: f.labels.values,
							};
						}),
				],
			});

			onResult();

			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-file-remove-title-ok"),
				t("notification-file-remove-long-ok", file.name)
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Inner>
			{files?.map((file, idx) => (
				<CustomTag
					key={`note_${idx}`}
					partyCode={code}
					file={file}
					onDelete={handleDelete}
				/>
			))}
		</Inner>
	);
};

export default Results;

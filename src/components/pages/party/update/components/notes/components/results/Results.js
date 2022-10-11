import React from "react";
import { Inner } from "./styles";
import Note from "./components/note/Note";
import InlineLoader from "../../../../../../../common/loader/Inline-loader/InlineLoader";
import { SkeletonComponent } from "./components/skeleton-component/SkeletonComponent";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

const Results = ({ notes, onResult, code }) => {
	const { t } = useTranslation();
	if (!notes) return <SkeletonComponent />;
	if (notes.length === 0) return <div>{t("no-information-available-lbl")}</div>;

	return (
		<Inner>
			{notes?.map((note, idx) => (
				<Note
					key={`note_${idx}`}
					note={note}
					onResult={onResult}
					notes={notes}
					code={code}
					index={idx}
				/>
			))}
		</Inner>
	);
};

export default Results;

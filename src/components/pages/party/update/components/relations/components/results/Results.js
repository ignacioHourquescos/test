import React from "react";
import { Inner, Section, SectionTitle, TagName, Tags, TagType } from "./styles";
import CustomTag from "./components/CustomTag";
import { remove_relation } from "../../../../../../../../api/people/general";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../../../utils/notificationToast";
import { useTranslation } from "../../../../../../../../contexts/translationContext";
import { SkeletonComponent } from "./components/skeleton-component/SkeletonComponent";

export default function Results({ code, relations, onDelete }) {
	const { t } = useTranslation();
	const handleDeleteTag = async (relation) => {
		try {
			await remove_relation(code, relation);
			onDelete();
			openNotificationWithIcon(
				TYPE.SUCCESS,
				t("notification-relation-remove-title-ok"),
				t("notification-relation-remove-long-ok")
			);
		} catch (error) {
			console.error(error);
		}
	};

	if (!relations) return <SkeletonComponent />;

	return (
		<Inner>
			<Section>
				<SectionTitle>{t("physical-person-lbl")}</SectionTitle>
				{!relations.individuals ? (
					t("no-information-available-lbl")
				) : (
					<Tags>
						{relations.individuals?.map((relation, idx) => (
							<CustomTag
								key={`individual_${idx}`}
								onDelete={() =>
									handleDeleteTag({
										partyCode: relation.partyCode,
										typeCode: relation.relationType.code,
									})
								}
							>
								<TagName>{`${relation.firstName} ${relation.lastName}`}</TagName>
								<TagType>{` (${relation.relationType.name})`}</TagType>
							</CustomTag>
						))}
					</Tags>
				)}
			</Section>

			<Section>
				<SectionTitle>{t("legal-person-lbl")}</SectionTitle>
				{!relations.organisations ? (
					t("no-information-available-lbl")
				) : (
					<Tags>
						{relations.organisations?.map((relation, idx) => (
							<CustomTag
								key={`organization_${idx}`}
								onDelete={() =>
									handleDeleteTag({
										partyCode: relation.partyCode,
										typeCode: relation.relationType.code,
									})
								}
							>
								<TagName>{relation.name}</TagName>
								<TagType>{` (${relation.relationType.name})`}</TagType>
							</CustomTag>
						))}
					</Tags>
				)}
			</Section>
		</Inner>
	);
}

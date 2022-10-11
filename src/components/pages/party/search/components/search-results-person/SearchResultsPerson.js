import React from "react";
import { Table } from "antd";
import { Action, Actions, EmptyResults, Inner, Title } from "./styles";
import { Link } from "react-router-dom";
import { useActions } from "../../../../../../contexts/actionsContext";
import { useTranslation } from "../../../../../../contexts/translationContext";
import SkeletonComponent from "./components/skeleton-component/SkeletonComponent";

export default function SearchResultsPerson({
	title,
	results,
	pageSize,
	totalItems,
	handlePagination,
}) {
	const { t } = useTranslation();
	const { hasAction } = useActions();

	const columns = [
		{
			title: t("name-lbl"),
			dataIndex: "firstName",
			key: "firstName",
			ellipsis: {
				showTitle: false,
			},
		},
		{
			title: t("last-name-lbl"),
			dataIndex: "lastName",
			key: "lastName",
			ellipsis: {
				showTitle: false,
			},
		},
		{
			title: t("id-type-lbl"),
			dataIndex: "identificationsType",
			key: "identificationsType",
			ellipsis: {
				showTitle: false,
			},
		},
		{
			title: t("identification-number-lbl"),
			dataIndex: "identificationsValue",
			key: "identificationsValue",
			ellipsis: {
				showTitle: false,
			},
		},
		{
			title: t("actions-subtitle"),
			key: "action",
			ellipsis: {
				showTitle: false,
			},
			hidden: !hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_VIEW_360_DETAIL"),
			render: (data) => {
				return (
					<Actions>
						<Action type="link">
							<Link to={`/party/people/view360/${data.key}/INDIVIDUAL`}>
								{t("to-view-btn")}
							</Link>
						</Action>
					</Actions>
				);
			},
		},
	];

	if (!results) return <SkeletonComponent />;

	return (
		<Inner>
			{results && !results.length && (
				<EmptyResults>
					<Title>{t("no-information-with-search-criteria-lbl")}</Title>

					{hasAction("PARTY_CREATE_MENU.INDIVIDUAL_CREATE") && (
						<Action type="link">
							<Link to="/party/people/create/INDIVIDUAL">
								{t("create-new-person-btn")}
							</Link>
						</Action>
					)}
				</EmptyResults>
			)}
			{results && results.length > 0 && (
				<React.Fragment>
					<Title>{title}</Title>
					<Table
						size="small"
						pagination={{
							onChange: (page, size) => {
								handlePagination(page, size);
							},
							pageSize: pageSize,
							total: totalItems,
							showSizeChanger: false,
						}}
						columns={columns.filter((c) => !c.hidden)}
						dataSource={results}
					/>
				</React.Fragment>
			)}
		</Inner>
	);
}

import React from "react";
import { Table } from "antd";
import { Action, Actions, Inner, Title } from "./styles";
import { Link } from "react-router-dom";
import { useActions } from "../../../../../../contexts/actionsContext";
import { useTranslation } from "../../../../../../contexts/translationContext";

export default function CreateResultsOrganization({ title, results }) {
	const { hasAction } = useActions();
	const { t } = useTranslation();

	const columns = [
		{
			title: t("business-name-lbl"),
			dataIndex: "name",
			key: "name",
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
			hidden: !hasAction("PARTY_CREATE_MENU.ORGANISATION_VIEW_360_DETAIL"),
			render: (data) => (
				<Actions>
					<Action type="link">
						<Link to={`/party/people/view360/${data.key}/ORGANISATION`}>
							Ver
						</Link>
					</Action>
				</Actions>
			),
		},
	];

	return (
		<Inner>
			{results && results.length > 0 && (
				<React.Fragment>
					<Title>{title}</Title>
					<Table
						size="small"
						pagination={false}
						columns={columns.filter((c) => !c.hidden)}
						dataSource={results}
					/>
				</React.Fragment>
			)}
		</Inner>
	);
}

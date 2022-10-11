import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "../../../../contexts/translationContext";
import Layout from "../../../common/layout";
import PersonTypeSelector from "../../../common/person-type-selector/PersonTypeSelector";
import CreatePerson from "./components/create-person/CreatePerson";
import CreateOrganization from "./components/create-organization/CreateOrganization";
import { Controls, Inner, Results } from "./styles";
import { useActions } from "../../../../contexts/actionsContext";
import CreateResultsPerson from "./components/create-results-person/CreateResultsPerson";
import CreateResultsOrganization from "./components/create-results-organization/CreateResultsOrganization";

export default function Create({ title, parents }) {
	const { t } = useTranslation();
	const { hasAction } = useActions();
	const { personTypeParam } = useParams();
	const [personType, setPersonType] = useState(null);
	const [resultsPerson, setResultsPerson] = useState(null);
	const [resultsOrganization, setResultsOrganization] = useState(null);

	useEffect(() => {
		const hasIndividualAction = hasAction(
			"PARTY_CREATE_MENU.INDIVIDUAL_CREATE"
		);

		const hasOrganizationAction = hasAction(
			"PARTY_CREATE_MENU.ORGANISATION_CREATE"
		);

		if (!hasIndividualAction && !hasOrganizationAction) history.push("/party");

		if (hasIndividualAction) {
			setPersonType(personTypeParam || "INDIVIDUAL");
		} else {
			setPersonType(personTypeParam || "ORGANISATION");
		}
	}, []);

	const onPersonTypeSelect = (value) => {
		setPersonType(value);
	};

	const onResult = (results) => {
		if (personType === "INDIVIDUAL") {
			setResultsPerson(results || []);
		} else {
			setResultsOrganization(results || []);
		}
	};

	if (!personType) return null;

	return (
		<Layout>
			<Layout.Main>
				<Inner>
					<Controls>
						<Layout.Header>
							<Layout.Breadcrumb>
								{parents &&
									parents.map((p, idx) => (
										<React.Fragment key={`bc_${idx}`}>
											<Layout.BreadcrumbItem>
												{p.path ? (
													<Link to={p.path}>{t(p.labelCode)}</Link>
												) : (
													t(p.labelCode)
												)}
											</Layout.BreadcrumbItem>
											{idx + 1 < parents.length && (
												<Layout.BreadcrumbSeparator />
											)}
										</React.Fragment>
									))}
							</Layout.Breadcrumb>
							<Layout.Title>{t(title)}</Layout.Title>
						</Layout.Header>
						<PersonTypeSelector
							actions={[
								"PARTY_CREATE_MENU.INDIVIDUAL_CREATE",
								"PARTY_CREATE_MENU.ORGANISATION_CREATE",
							]}
							value={personType}
							onChange={onPersonTypeSelect}
						/>
						{personType === "INDIVIDUAL" ? (
							<CreatePerson onResult={onResult} />
						) : (
							<CreateOrganization onResult={onResult} />
						)}
					</Controls>
					<Results>
						{personType === "INDIVIDUAL" ? (
							<CreateResultsPerson results={resultsPerson} />
						) : (
							<CreateResultsOrganization results={resultsOrganization} />
						)}
					</Results>
				</Inner>
			</Layout.Main>
		</Layout>
	);
}

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "../../../../contexts/translationContext";
import Layout from "../../../common/layout";
import PersonTypeSelector from "../../../common/person-type-selector/PersonTypeSelector";
import SearchPerson from "./components/search-person/SearchPerson";
import SearchOrganization from "./components/search-organization/SearchOrganization";
import { Controls, Inner, Results } from "./styles";
import SearchResultsPerson from "./components/search-results-person/SearchResultsPerson";
import SearchResultsOrganization from "./components/search-results-organization/SearchResultsOrganization";
import { search_person } from "../../../../api/people/people-endpoints";
import { search_organization } from "../../../../api/people/organizations-endpoints";
import { useActions } from "../../../../contexts/actionsContext";

export default function Search({ title, parents }) {
	const { t } = useTranslation();
	const history = useHistory();
	const { hasAction } = useActions();
	const [personType, setPersonType] = useState(null);
	const [resultsPerson, setResultsPerson] = useState(null);
	const [resultsOrganization, setResultsOrganization] = useState(null);
	const [resultsTitle, setResultsTitle] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	const onPersonTypeSelect = (value) => {
		setPersonType(value);
	};

	const fetch_people = async (page, pageSize) => {
		const res = await search_person({
			pageSize,
			page,
			sort: "ACTIVE_DATE_DESC",
		});

		const people = res?.values?.map((person) => {
			return {
				key: person.code,
				firstName: person.firstName,
				lastName: person.lastName,
				identificationsType: person.identifications.values[0].type.name,
				identificationsValue: person.identifications.values[0].value,
			};
		});

		const total = res?.total;
		setTotalItems(total);
		setResultsPerson(people || []);
	};

	const fetch_organizations = async (page, pageSize) => {
		const res = await search_organization({ pageSize, page });

		const organizations = res?.values?.map((organization) => {
			return {
				key: organization.code,
				name: organization.name,
				identificationsType: organization.identifications.values[0].type.name,
				identificationsValue: organization.identifications.values[0].value,
			};
		});
		const total = res?.total;
		setTotalItems(total);
		setResultsOrganization(organizations || []);
	};

	useEffect(() => {
		const hasIndividualAction = hasAction(
			"PARTY_SEARCH_MENU.INDIVIDUAL_SEARCH"
		);

		const hasOrganizationAction = hasAction(
			"PARTY_SEARCH_MENU.ORGANISATION_SEARCH"
		);

		if (!hasIndividualAction && !hasOrganizationAction) history.push("/party");

		if (hasIndividualAction) {
			setPersonType("INDIVIDUAL");
		} else {
			setPersonType("ORGANISATION");
		}
	}, []);

	useEffect(() => {
		if (!personType) return;

		if (personType === "INDIVIDUAL") {
			setResultsTitle(t("last-physical-persons-edited-created-title"));
			fetch_people(1, pageSize);
		} else {
			setResultsTitle(t("last-legal-entities-edited-created-title"));
			fetch_organizations(1, pageSize);
		}
	}, [personType]);

	const onSearch = (results, total) => {
		if (personType === "INDIVIDUAL") {
			setResultsTitle(
				`${t("result-search-natural-person-title")}: (${results?.length})`
			);
			setResultsPerson(results || []);
			setTotalItems(total);
		} else {
			setResultsTitle(
				`${t("legal-person-search-result-title")}: (${results?.length})`
			);
			setResultsOrganization(results || []);
			setTotalItems(total);
		}
	};

	const handlePagination = (currentPage, pageSize) => {
		if (personType === "INDIVIDUAL") {
			fetch_people(currentPage, pageSize);
		} else {
			fetch_organizations(currentPage, pageSize);
		}

		setPageSize(pageSize);
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
								"PARTY_SEARCH_MENU.INDIVIDUAL_SEARCH",
								"PARTY_SEARCH_MENU.ORGANISATION_SEARCH",
							]}
							value={personType}
							onChange={onPersonTypeSelect}
						/>
						{personType === "INDIVIDUAL" ? (
							<SearchPerson onSearch={onSearch} />
						) : (
							<SearchOrganization onSearch={onSearch} />
						)}
					</Controls>
					<Results>
						{personType === "INDIVIDUAL" ? (
							<SearchResultsPerson
								title={resultsTitle}
								results={resultsPerson}
								pageSize={pageSize}
								totalItems={totalItems}
								handlePagination={handlePagination}
							/>
						) : (
							<SearchResultsOrganization
								title={resultsTitle}
								results={resultsOrganization}
								pageSize={pageSize}
								totalItems={totalItems}
								handlePagination={handlePagination}
							/>
						)}
					</Results>
				</Inner>
			</Layout.Main>
		</Layout>
	);
}

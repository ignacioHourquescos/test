import DataLayout from "../data-layout/DataLayout";
import React, { useState, useEffect } from "react";
import CreateRelation from "./components/create-relation/CreateRelation";
import PersonTypeSelector from "../../../../../common/person-type-selector/PersonTypeSelector";
import SearchPerson from "./components/search-person/SearchPerson";
import SearchOrganization from "./components/search-organization/SearchOrganization";
import SearchResultsPerson from "./components/search-results-person/SearchResultsPerson";
import SearchResultsOrganization from "./components/search-results-organization/SearchResultsOrganization";
import { get_relation_types } from "../../../../../../api/people/people-endpoints";
import CreateRelationWithPerson from "./components/create-relation-with-person/CreateRelationWithPerson";
import CreateRelationWithOrganization from "./components/create-relation-with-organization/CreateRelationWithOrganization";
import { get_relations_by_party_code } from "../../../../../../api/people/general";
import Results from "./components/results/Results";
import { useTranslation } from "../../../../../../contexts/translationContext";

export default function Relations({ code, personTypeOrigin }) {
	const { t } = useTranslation();
	const [personType, setPersonType] = useState("INDIVIDUAL");
	const [results, setResults] = useState(null);
	const [resultsTitle, setResultsTitle] = useState(null);
	const [selectedParty, setSelectedParty] = useState(null);
	const [searchValues, setSearchValues] = useState(null);
	const [relationTypes, setRelationTypes] = useState(null);
	const [relations, setRelations] = useState(null);

	const fetch_data = async () => {
		const response = await get_relations_by_party_code(code);
		setRelations(response || []);
	};

	useEffect(() => {
		fetch_data();
	}, [code]);

	useEffect(() => {
		fetch_relation_types();
	}, [results]);

	const fetch_relation_types = async () => {
		try {
			const response = await get_relation_types(personType);
			setRelationTypes(response.values || []);
		} catch (error) {
			setRelationTypes([]);
		}
	};

	const onPersonTypeSelect = (value) => {
		setPersonType(value);
		setResults(null);
		setSelectedParty(null);
	};

	const onSearch = (results, values) => {
		if (personType === "INDIVIDUAL") {
			setSearchValues(values);
			setResultsTitle(t("add-relation-subtitle"));
			setResults(results || []);
			setSelectedParty(null);
		} else {
			setSearchValues(values);
			setResultsTitle(t("add-relation-subtitle"));
			setResults(results || []);
			setSelectedParty(null);
		}
	};

	const onSelectItem = async (item) => {
		setSelectedParty(item);
	};

	const onCancelCreate = () => {
		setResults(null);
		setSelectedParty(null);
		fetch_data();
	};

	const onCreate = () => {
		setResults(null);
		setSelectedParty(null);
		fetch_data();
	};

	return (
		<DataLayout>
			<DataLayout.Left>
				<DataLayout.Title>{t("add-relation-subtitle")}</DataLayout.Title>

				<PersonTypeSelector
					actions={[
						"PARTY_SEARCH_MENU.INDIVIDUAL_SEARCH",
						"PARTY_SEARCH_MENU.ORGANISATION_SEARCH",
					]}
					value={personType}
					onChange={onPersonTypeSelect}
				/>

				{personType === "INDIVIDUAL" && (!results || results?.length > 0) && (
					<SearchPerson onSearch={onSearch} />
				)}

				{personType === "ORGANISATION" && (!results || results?.length > 0) && (
					<SearchOrganization onSearch={onSearch} />
				)}

				{personType === "INDIVIDUAL" && results?.length > 0 && (
					<SearchResultsPerson
						title={resultsTitle}
						results={results}
						onSelect={onSelectItem}
					/>
				)}

				{personType === "ORGANISATION" && results?.length > 0 && (
					<SearchResultsOrganization
						title={resultsTitle}
						results={results}
						onSelect={onSelectItem}
					/>
				)}

				{personType === "INDIVIDUAL" &&
					results &&
					results?.length === 0 &&
					!selectedParty && (
						<CreateRelationWithPerson
							code={code}
							relationTypes={relationTypes}
							initialValues={searchValues}
							onCancel={onCancelCreate}
							onCreated={onCreate}
						/>
					)}

				{personType === "ORGANISATION" &&
					results &&
					results?.length === 0 &&
					!selectedParty && (
						<CreateRelationWithOrganization
							code={code}
							relationTypes={relationTypes}
							initialValues={searchValues}
							onCancel={onCancelCreate}
							onCreated={onCreate}
						/>
					)}

				{selectedParty && relationTypes && results && results.length > 0 && (
					<CreateRelation
						code={code}
						selectedParty={selectedParty}
						relationTypes={relationTypes}
						onCreated={onCreate}
					/>
				)}
			</DataLayout.Left>
			<DataLayout.Right>
				<DataLayout.Title>{t("linked-relationships-title")}</DataLayout.Title>
				<Results code={code} relations={relations} onDelete={fetch_data} />
			</DataLayout.Right>
		</DataLayout>
	);
}

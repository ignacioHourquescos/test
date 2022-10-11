import React, { useState, useEffect } from "react";
import { useTranslation } from "../../../../contexts/translationContext";
import Layout from "../../../common/layout";
import { get_person_by_code } from "../../../../api/people/people-endpoints";
import { Link, useHistory, useParams } from "react-router-dom";
import { get_organization_by_code } from "../../../../api/people/organizations-endpoints";
import { FirstColumn, Inner, SecondColumn, CardContainer } from "./styles";

import PersonalInformation from "./components/personal-information/PersonalInformation";
import PaymentInformation from "./components/payment-information/PaymentInformation";
import RelationsInformation from "./components/relations-information/RelationsInformation";
import FilesInformation from "./components/files-information/FilesInformation";
import NotesInformation from "./components/notes-information/NotesInformation";
import {
	get_files,
	get_notes,
	get_relations,
} from "../../../../api/people/general";
import OrganizationInformation from "./components/organization-information/OrganizationInformation";
import { get_payment_methods_by_party_code } from "../../../../api/finance/finance-endpoints";
import { useActions } from "../../../../contexts/actionsContext";

export default function View360({ parents }) {
	const { hasAction } = useActions();
	const history = useHistory();
	const { personType, code } = useParams();
	const { t } = useTranslation();
	const [loading, setLoading] = useState(true);
	const [personalInformation, setPersonalInformation] = useState(null);
	const [relations, setRelations] = useState(null);
	const [notes, setNotes] = useState(null);
	const [files, setFiles] = useState(null);
	const [payments, setPayments] = useState(null);

	useEffect(() => {
		const fetch_person = async () => {
			const data = await get_person_by_code(code);
			setPersonalInformation({ ...data, code, personType });
		};

		const fetch_organization = async () => {
			const data = await get_organization_by_code(code);
			setPersonalInformation({ ...data, code, personType });
		};

		const fetch_relations = async () => {
			const data = await get_relations(code);
			setRelations({ ...data, code, personType });
		};

		const fetch_notes = async () => {
			const data = await get_notes(code);
			setNotes({ ...data, code, personType });
		};

		const fetch_files = async () => {
			const data = await get_files(code);
			setFiles({ ...data, code, personType });
		};

		const fetch_payment_methods = async () => {
			const data = await get_payment_methods_by_party_code(code);
			setPayments({
				bankAccountData: { values: data?.bankAccountData?.values || [] },
				creditCardData: { values: data?.creditCardData?.values || [] },
				cashData: { values: data?.cashData?.values || [] },
				code,
				personType,
			});
		};

		if (personType === "INDIVIDUAL") {
			fetch_person();
		} else {
			fetch_organization();
		}

		fetch_relations();
		fetch_notes();
		fetch_files();
		fetch_payment_methods();
	}, []);

	if (
		(personType === "INDIVIDUAL" &&
			!hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_VIEW_360_DETAIL")) ||
		(personType === "ORGANISATION" &&
			!hasAction("PARTY_SEARCH_MENU.ORGANISATION_VIEW_360_DETAIL"))
	)
		history.push("/party");

	return (
		<Layout>
			<Layout.Main>
				<Inner>
					<Layout.Header>
						<Layout.Breadcrumb>
							<Layout.BreadcrumbItem>
								<Link to="/party">{t("party-module")}</Link>
							</Layout.BreadcrumbItem>
							<Layout.BreadcrumbSeparator />
							<Layout.BreadcrumbItem>
								{t("360-view-title")}
							</Layout.BreadcrumbItem>
							{/* {parents &&
                parents.map((p, idx) => (
                  <React.Fragment key={`bc_${idx}`}>
                    <Layout.BreadcrumbItem>
                      {p.path ? (
                        <Link to={p.path}>{t(p.labelCode)}</Link>
                      ) : (
                        t(p.labelCode)
                      )}
                    </Layout.BreadcrumbItem>
                    {idx + 1 < parents.length && <Layout.BreadcrumbSeparator />}
                  </React.Fragment>
                ))} */}
						</Layout.Breadcrumb>
						<Layout.Title>{t("360-view-title")}</Layout.Title>
					</Layout.Header>

					<CardContainer>
						<>
							<FirstColumn>
								{personType === "INDIVIDUAL" ? (
									<PersonalInformation info={personalInformation} />
								) : (
									<OrganizationInformation info={personalInformation} />
								)}
							</FirstColumn>
							<SecondColumn>
								{((personType === "INDIVIDUAL" &&
									hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_RELATIONS_DETAIL")) ||
									(personType === "ORGANISATION" &&
										hasAction(
											"PARTY_SEARCH_MENU.ORGANISATION_RELATIONS_DETAIL"
										))) && <RelationsInformation info={relations} />}

								{((personType === "INDIVIDUAL" &&
									hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_FILES_DETAIL")) ||
									(personType === "ORGANISATION" &&
										hasAction(
											"PARTY_SEARCH_MENU.ORGANISATION_FILES_DETAIL"
										))) && <FilesInformation info={files} />}

								{((personType === "INDIVIDUAL" &&
									hasAction(
										"PARTY_SEARCH_MENU.INDIVIDUAL_PAYMENT_METHODS_DETAIL"
									)) ||
									(personType === "ORGANISATION" &&
										hasAction(
											"PARTY_SEARCH_MENU.ORGANISATION_PAYMENT_METHODS_DETAIL"
										))) && <PaymentInformation info={payments} />}

								{((personType === "INDIVIDUAL" &&
									hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_NOTES_DETAIL")) ||
									(personType === "ORGANISATION" &&
										hasAction(
											"PARTY_SEARCH_MENU.ORGANISATION_NOTES_DETAIL"
										))) && <NotesInformation info={notes} />}
							</SecondColumn>
						</>
					</CardContainer>
				</Inner>
			</Layout.Main>
		</Layout>
	);
}

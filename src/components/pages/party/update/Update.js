import React, { useState, useEffect } from "react";
import { Tabs, ArrowLeftOutlined } from "antd";
import { useTranslation } from "../../../../contexts/translationContext";
import Layout from "../../../common/layout";
import { Link, useLocation, useParams } from "react-router-dom";
import { Inner } from "./styles";
import GeneralInformation from "./components/general-information/GeneralInformation";
import Notes from "./components/notes/Notes";
import PaymentMethod from "./components/payment-methods/PaymentMethods";
import Relations from "./components/relations/Relations";
import Files from "./components/files/Files";
import { get_person_by_code } from "../../../../api/people/people-endpoints";
import { get_organization_by_code } from "../../../../api/people/organizations-endpoints";
import moment from "moment";
import { useActions } from "../../../../contexts/actionsContext";
import SkeletonTitle from "./components/skeleton-title/SkeletonTitle";

const { TabPane } = Tabs;

export default function Update({ parents }) {
	const { code, personType, section } = useParams();
	const { hasAction } = useActions();
	const { t } = useTranslation();
	const [initialValues, setInitialValues] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const currentLocation = location.pathname;
		const idx = currentLocation.lastIndexOf("/");
		const newPath = currentLocation.substring(0, idx);
		window.history.replaceState(null, null, newPath);
	}, []);

	useEffect(() => {
		const fetch_person = async () => {
			const data = await get_person_by_code(code);

			const practice = data?.practices?.values[0];

			const init = {
				lastName: data.data.lastName,
				firstName: data.data.firstName,
				birthdate: data.data.birthdate
					? moment(data.data.birthdate, "YYYY-MM-DD")
					: null,
				genderCode: data.data.gender.code,
				maritalStatusCode: data.data.maritalStatus?.code,
				residenceCountryCode: data.data.country.code,
				nationality: data?.nationalities?.values[0]?.code,
				workerType: data?.workerTypes?.values[0]?.code,
				practice: practice?.isicCode,
				activity: practice?.activity?.code,
				sector: practice?.activity?.sector?.code,
				economicClass: data?.economicClasses?.values[0]?.code,
				identifications: data.identifications
					? data.identifications.values.map((identification) => {
							return {
								identificationType: identification.type.code,
								identificationValue: identification.value,
								disabled: identification.default,
							};
					  })
					: [],
				emails: data.mails
					? data.mails.values.map((email) => {
							return {
								emailType: email.type.code,
								email: email.value,
							};
					  })
					: [],
				phones: data.phones
					? data.phones.values.map((phone) => {
							return {
								phoneType: phone.type.code,
								phone: phone.number,
								areaCode: phone.areaCode,
								locationCode: phone.locationCode,
								intern: phone.extension,
							};
					  })
					: [],
				addresses: data.addresses
					? data.addresses.values.map((address) => {
							return {
								street: address.street,
								addressNumber: address.number,
								floor: address.floor,
								dpto: address.apartment?.toUpperCase(),
								observations: address.observations,
								city: address.city.code,
								province: address.city.province.code,
								postalCode: address.postalCode.number,
								addressType: address.type.code,
							};
					  })
					: [],
				fiscalCategory:
					data.fiscalCategories && data.fiscalCategories.values
						? data.fiscalCategories.values[0]?.fiscalCategory?.code
						: null,
			};
			setInitialValues(init);
		};

		const fetch_organization = async () => {
			const data = await get_organization_by_code(code);

			const practice = data?.practices?.values[0];

			const init = {
				name: data.data.name,
				foundationDate: data.data.foundationDate
					? moment(data.data.foundationDate, "YYYY-MM-DD")
					: null,
				type: data.data.typeCode.code,
				residenceCountryCode: data.data.hostCountry.code,
				practice: practice?.isicCode,
				activity: practice?.activity?.code,
				sector: practice?.activity?.sector?.code,
				identifications: data.identifications
					? data.identifications.values.map((identification) => {
							return {
								identificationType: identification.type.code,
								identificationValue: identification.value,
								disabled: true,
							};
					  })
					: [],
				emails: data.mails
					? data.mails.values.map((email) => {
							return {
								emailType: email.type.code,
								email: email.value,
							};
					  })
					: [],
				phones: data.phones
					? data.phones.values.map((phone) => {
							return {
								phoneType: phone.type.code,
								phone: phone.number,
								areaCode: phone.areaCode,
								locationCode: phone.locationCode,
								intern: phone.extension,
							};
					  })
					: [],
				addresses: data.addresses
					? data.addresses.values.map((address) => {
							return {
								street: address.street,
								addressNumber: address.number,
								floor: address.floor,
								dpto: address.apartment?.toUpperCase(),
								observations: address.observations,
								city: address.city.code,
								province: address.city.province.code,
								postalCode: address.postalCode.number,
								addressType: address.type.code,
							};
					  })
					: [],
				fiscalCategory:
					data.fiscalCategories && data.fiscalCategories.values
						? data.fiscalCategories.values[0]?.fiscalCategory?.code
						: null,
			};
			setInitialValues(init);
		};

		if (personType === "INDIVIDUAL") {
			fetch_person();
		} else {
			fetch_organization();
		}
	}, [code]);

	return (
		<Layout>
			<Inner>
				<Layout.Header>
					<Layout.Breadcrumb>
						<Layout.BreadcrumbItem>
							<Link to="/party">{t("party-module")}</Link>
						</Layout.BreadcrumbItem>
						<Layout.BreadcrumbSeparator />
						<Layout.BreadcrumbItem>{t("360-view-title")}</Layout.BreadcrumbItem>
					</Layout.Breadcrumb>
					{/* <Layout.Breadcrumb>
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
                {idx + 1 < parents.length && <Layout.BreadcrumbSeparator />}
              </React.Fragment>
            ))}
        </Layout.Breadcrumb> */}
					<Layout.Title>
						{!initialValues ? (
							<SkeletonTitle />
						) : (
							<>
								<Link to={`/party/people/view360/${code}/${personType}`}>
									&larr;&nbsp;
								</Link>
								{`${
									personType === "INDIVIDUAL"
										? `${initialValues.firstName} ${initialValues.lastName}`
										: `${initialValues.name}`
								} - ${t("360-view-title")}`}
							</>
						)}
					</Layout.Title>
				</Layout.Header>
				<Layout.Main>
					<Tabs defaultActiveKey={section || "personal-information"}>
						<TabPane
							tab={t("personal-information-subtitle")}
							key="personal-information"
						>
							<GeneralInformation
								code={code}
								personType={personType}
								initialValues={initialValues}
							/>
						</TabPane>

						{((personType === "INDIVIDUAL" &&
							hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_RELATIONS_DETAIL")) ||
							(personType === "ORGANISATION" &&
								hasAction(
									"PARTY_SEARCH_MENU.ORGANISATION_RELATIONS_DETAIL"
								))) && (
							<TabPane tab={t("relations-view-title")} key="relations">
								<Relations code={code} personTypeOrigin={personType} />
							</TabPane>
						)}

						{((personType === "INDIVIDUAL" &&
							hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_NOTES_DETAIL")) ||
							(personType === "ORGANISATION" &&
								hasAction("PARTY_SEARCH_MENU.ORGANISATION_NOTES_DETAIL"))) && (
							<TabPane tab={t("note-title")} key="notes">
								<Notes code={code} />
							</TabPane>
						)}

						{((personType === "INDIVIDUAL" &&
							hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_FILES_DETAIL")) ||
							(personType === "ORGANISATION" &&
								hasAction("PARTY_SEARCH_MENU.ORGANISATION_FILES_DETAIL"))) && (
							<TabPane tab={t("records-title")} key="files">
								<Files code={code} />
							</TabPane>
						)}

						{((personType === "INDIVIDUAL" &&
							hasAction(
								"PARTY_SEARCH_MENU.INDIVIDUAL_PAYMENT_METHODS_DETAIL"
							)) ||
							(personType === "ORGANISATION" &&
								hasAction(
									"PARTY_SEARCH_MENU.ORGANISATION_PAYMENT_METHODS_DETAIL"
								))) && (
							<TabPane tab={t("payment-methods-title")} key="payment">
								<PaymentMethod code={code} />
							</TabPane>
						)}
					</Tabs>
				</Layout.Main>
			</Inner>
		</Layout>
	);
}

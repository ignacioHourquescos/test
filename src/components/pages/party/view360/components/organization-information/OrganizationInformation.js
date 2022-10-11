import React from "react";
import { useTranslation } from "../../../../../../contexts/translationContext";
import { Link } from "react-router-dom";
import { useActions } from "../../../../../../contexts/actionsContext";
import SkeletonComponent from "./components/skeleton-component/SkeletonComponent";
import Card from "../../../../../common/card/Card";

export default function OrganizationInformation({ info }) {
	const { t } = useTranslation();
	const { hasAction } = useActions();

	if (!info) return <SkeletonComponent />;

	return (
		<Card>
			<Card.TitleContainer>
				<Card.Title>{t("organization-data-subtitle")}</Card.Title>
				{((info.personType === "INDIVIDUAL" &&
					hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_UPDATE")) ||
					(info.personType === "ORGANISATION" &&
						hasAction("PARTY_SEARCH_MENU.ORGANISATION_UPDATE"))) && (
					<Card.Link>
						<Link
							to={`/party/people/${info.code}/ORGANISATION/datos-personales`}
						>
							{t("to-update-btn")}
						</Link>
					</Card.Link>
				)}
			</Card.TitleContainer>
			<Card.Content>
				<Card.SubTitle>{info.data.name}</Card.SubTitle>
				<Card.DataPoint>
					<Card.DataPointValue>
						{`${
							info.data.hostCountry?.name
								? `${t("origin-lbl")} ${info.data.hostCountry.name}`
								: ""
						} ${
							info.data.foundationDate
								? `, ${t("founded-lbl")}  ${info.data.foundationDate.slice(
										8,
										10
								  )}-${info.data.foundationDate.slice(
										5,
										7
								  )}-${info.data.foundationDate.slice(0, 4)},`
								: ""
						}`}
					</Card.DataPointValue>
				</Card.DataPoint>

				<Card.SubTitle>{t("contact-title")}</Card.SubTitle>
				{(info.phones && info.phones.values && info.phones.values.length > 0) ||
				(info.mails && info.mails.values && info.mails.values.length > 0) ? (
					<>
						{info.phones &&
							info.phones.values.length > 0 &&
							info.phones.values.map((element, idx) => (
								<Card.DataPoint key={`phone_${idx}`}>
									<Card.DataPointLabel>{`${element.type.name}:`}</Card.DataPointLabel>
									<Card.DataPointValue>
										{` +${element.areaCode}-${element.locationCode}-${
											element.number
										}-${element.extension || ""}`}
									</Card.DataPointValue>
								</Card.DataPoint>
							))}

						{info.mails &&
							info.mails.values.length > 0 &&
							info.mails.values.map((element, idx) => (
								<Card.DataPoint key={`email_${idx}`}>
									<Card.DataPointLabel>
										{element.type.name + ": "}
									</Card.DataPointLabel>
									<Card.DataPointValue>{` ${element.value}`}</Card.DataPointValue>
								</Card.DataPoint>
							))}
					</>
				) : (
					<Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
				)}

				<Card.SubTitle>{t("identifications-title")}</Card.SubTitle>
				{info.identifications && info.identifications.values.length > 0 ? (
					info.identifications.values.map((element, idx) => (
						<Card.DataPoint key={`identification_${idx}`}>
							<Card.DataPointLabel>
								{element.type.name + ": "}
							</Card.DataPointLabel>
							<Card.DataPointValue>{` ${element.value}`}</Card.DataPointValue>
						</Card.DataPoint>
					))
				) : (
					<Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
				)}

				<Card.SubTitle>{t("tax-data-title")}</Card.SubTitle>
				{info.fiscalCategories && info.fiscalCategories.values.length > 0 ? (
					info.fiscalCategories.values.map((element, idx) => (
						<Card.DataPoint key={`fiscal_data_${idx}`}>
							<Card.DataPointValue>
								{element.fiscalCategory.name}
							</Card.DataPointValue>
						</Card.DataPoint>
					))
				) : (
					<Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
				)}

				<Card.SubTitle>{t("sector-lbl")}</Card.SubTitle>
				{info.practices && info.practices.values.length > 0 ? (
					info.practices.values.map((element, idx) => (
						<Card.DataPoint key={`practice_${idx}`}>
							<Card.DataPointValue>
								{`${element.name}, ${element.activity.name}, ${element.activity.sector.name}`}
							</Card.DataPointValue>
						</Card.DataPoint>
					))
				) : (
					<Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
				)}

				<Card.SubTitle>{t("home-title")}</Card.SubTitle>
				{info.addresses && info.addresses.values.length > 0 ? (
					info.addresses.values.map((element, idx) => (
						<Card.DataPoint key={`domicilio_${idx}`}>
							<Card.DataPointLabel>
								{`${element.type.name}: `}
							</Card.DataPointLabel>
							<Card.DataPointValue>
								{` ${element.street}, ${element.number}, ${
									element.floor
										? `${t("flat-lbl")}:` + element.floor + ", "
										: ""
								} ${
									element.apartment
										? `${t("dept-lbl")}:` + element.apartment + ", "
										: ""
								} ${element.city.name}, ${element.city.province.name}, ${
									element.city.province.country.name
								}, ${element.postalCode.prefix}`}
							</Card.DataPointValue>
							<Card.DataPoint>({element.observations})</Card.DataPoint>
						</Card.DataPoint>
					))
				) : (
					<Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
				)}
			</Card.Content>
		</Card>
	);
}

import React, { useState } from "react";
import { Form, Button } from "antd";
import Identifications from "./identifications/Identifications";
import { update_person } from "../../../../../../api/people/people-endpoints";
import { update_organization } from "../../../../../../api/people/organizations-endpoints";
import PersonalInformation from "./personal-information/PersonalInformation";
import OrganizationInformation from "./organization-information/OrganizationInformation";
import { Inner } from "./styles";
import Emails from "./emails/Emails";
import Phones from "./phones/Phones";
import Addresses from "./addresses/Addresses";
import FiscalCategories from "./fiscal-categories/FiscalCategories";
import moment from "moment";
import {
	openNotificationWithIcon,
	TYPE,
} from "../../../../../../utils/notificationToast";
import DataContainer from "../data-container/DataContainer";
import { useTranslation } from "../../../../../../contexts/translationContext";
import SkeletonComponent from "./skeleton-component/SkeletonComponent";

export default function GeneralInformation({
	code,
	personType,
	initialValues,
}) {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	const onFinish = async (values) => {
		try {
			setSubmitting(true);

			if (personType === "INDIVIDUAL") {
				const data = {
					data: {
						firstName: values.firstName,
						lastName: values.lastName,
						birthdate: values.birthdate
							? moment(values.birthdate).format("YYYY-MM-DD")
							: null,
						maritalStatusCode: values.maritalStatusCode,
					},
					identifications:
						values.identifications && values.identifications.length > 0
							? {
									values:
										values.identifications?.map((identification) => {
											return {
												value: identification.identificationValue,
												typeCode: identification.identificationType,
											};
										}) || [],
							  }
							: null,
					mails:
						values.emails && values.emails.length > 0
							? {
									values:
										values.emails?.map((email) => {
											return {
												value: email.email,
												typeCode: email.emailType,
											};
										}) || [],
							  }
							: null,
					phones:
						values.phones && values.phones.length > 0
							? {
									values:
										values.phones?.map((phone) => {
											return {
												locationCode: phone.locationCode,
												areaCode: phone.areaCode,
												number: phone.phone,
												typeCode: phone.phoneType,
												extension: phone.intern,
											};
										}) || [],
							  }
							: null,
					nationalities: values.nationality
						? {
								values: [{ code: values.nationality }],
						  }
						: null,
					workerTypes: values.workerType
						? {
								values: [
									{
										code: values.workerType,
									},
								],
						  }
						: null,
					addresses:
						values.addresses && values.addresses.length > 0
							? {
									values:
										values.addresses?.map((address) => {
											return {
												street: address.street,
												number: parseInt(address.addressNumber),
												floor: address.floor,
												apartment: address.dpto?.toUpperCase(),
												observations: address.observations,
												cityCode: address.city,
												postalCode: address.postalCode,
												typeCode: address.addressType,
											};
										}) || [],
							  }
							: null,
					practices: values.practice
						? {
								values: [
									{
										isicCode: values.practice,
									},
								],
						  }
						: null,
					economicClasses: values.economicClass
						? {
								values: [
									{
										code: values.economicClass,
										name: values.economicClass,
									},
								],
						  }
						: null,
					fiscalCategories: values.fiscalCategory
						? {
								values: [{ typeCode: values.fiscalCategory }],
						  }
						: null,
				};

				await update_person(code, data);

				openNotificationWithIcon(
					TYPE.SUCCESS,
					t("notification-edited-physical-person-title-ok"),
					t(
						"notification-edited-physical-person-long-ok",
						values.firstName,
						values.lastName
					)
				);
			} else {
				const data = {
					data: {
						name: values.name,
						foundationDate: values.foundationDate
							? moment(values.foundationDate).format("YYYY-MM-DD")
							: null,
					},
					identifications:
						values.identifications && values.identifications.length > 0
							? {
									values:
										values.identifications?.map((identification) => {
											return {
												value: identification.identificationValue,
												typeCode: identification.identificationType,
											};
										}) || [],
							  }
							: null,
					mails:
						values.emails && values.emails.length > 0
							? {
									values:
										values.emails?.map((email) => {
											return {
												value: email.email,
												typeCode: email.emailType,
											};
										}) || [],
							  }
							: null,
					phones:
						values.phones && values.phones.length > 0
							? {
									values:
										values.phones?.map((phone) => {
											return {
												locationCode: phone.locationCode,
												areaCode: phone.areaCode,
												number: phone.phone,
												typeCode: phone.phoneType,
												extension: phone.intern,
											};
										}) || [],
							  }
							: null,
					addresses:
						values.addresses && values.addresses.length > 0
							? {
									values:
										values.addresses?.map((address) => {
											return {
												street: address.street,
												number: parseInt(address.addressNumber),
												floor: address.floor,
												apartment: address.dpto?.toUpperCase(),
												observations: address.observations,
												cityCode: address.city,
												postalCode: address.postalCode,
												typeCode: address.addressType,
											};
										}) || [],
							  }
							: null,
					practices: values.practice
						? {
								values: [
									{
										isicCode: values.practice,
									},
								],
						  }
						: null,
					fiscalCategories: values.fiscalCategory
						? {
								values: [{ typeCode: values.fiscalCategory }],
						  }
						: null,
				};

				await update_organization(code, data);

				openNotificationWithIcon(
					TYPE.SUCCESS,
					t("notification-edited-legal-person-title-ok"),
					t("notification-edited-legal-person-long-ok", values.name)
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	if (!initialValues) return <SkeletonComponent />;

	return (
		<Inner>
			<Form
				form={form}
				name="update-personal-information-form"
				layout="vertical"
				onFinish={onFinish}
				autoComplete="off"
				initialValues={initialValues}
			>
				{personType === "INDIVIDUAL" ? (
					<PersonalInformation form={form} />
				) : (
					<OrganizationInformation form={form} />
				)}

				<Identifications personType={personType} form={form} />
				<Emails form={form} />
				<Phones form={form} />
				<Addresses personType={personType} form={form} />
				<FiscalCategories personType={personType} form={form} />

				<DataContainer>
					<DataContainer.Section></DataContainer.Section>
					<DataContainer.Content>
						<Form.Item>
							<Button type="primary" htmlType="submit" loading={submitting}>
								{t("save-btn")}
							</Button>
						</Form.Item>
					</DataContainer.Content>
				</DataContainer>
			</Form>
		</Inner>
	);
}

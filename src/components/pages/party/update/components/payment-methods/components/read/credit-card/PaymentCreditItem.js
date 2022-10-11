import { Popconfirm } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { update_payments } from "../../../../../../../../../api/finance/finance-endpoints";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import EditPaymentCredit from "../../edit/credit-card/EditPaymentCredit";

import {
	Buttons,
	CardNumber,
	CardType,
	EditButton,
	ExpirationDate,
	Inner,
	OwnerName,
	Title,
} from "./styles";

export default function PaymentCreditCardItem({
	code,
	item,
	idx,
	onDelete,
	payments,
	onEdit,
}) {
	const { t } = useTranslation();
	const [editMode, setEditMode] = useState(false);

	const confirm = async (e) => {
		const post_data = {
			bankAccountData:
				payments.bankAccountData.values.length > 0
					? {
							values: payments.bankAccountData.values.map((el) => {
								return {
									number: el.number,
									cbu: el.cbu,
									currencyCode: el.currency.code,
									bankBranchCode: el.bankBranch.code,
									bankAccountTypeCode: el.bankAccountType.code,
								};
							}),
					  }
					: null,
			cashData:
				payments.cashData.values.length > 0
					? {
							values: payments.cashData.values.map((el) => {
								return {
									currencyCode: el.currencyCode,
								};
							}),
					  }
					: null,
			creditCardData:
				payments.creditCardData.values.length > 1
					? {
							values: payments.creditCardData.values
								.filter((i, index) => idx !== index)
								.map((el) => {
									return {
										ownerName: el.ownerName,
										number: el.number,
										securityCode: el.securityCode,
										dateFrom: el.dateFrom,
										dateTo: el.dateTo,
										typeCode: el.cardType.code,
									};
								}),
					  }
					: null,
		};

		await update_payments(code, post_data);

		onDelete();
	};

	return (
		<Inner>
			{editMode ? (
				<EditPaymentCredit
					item={item}
					idx={idx}
					code={code}
					payments={payments}
					onEdit={onEdit}
					onCancel={() => setEditMode(false)}
				/>
			) : (
				<>
					<Title>{t("credit-debit-card-btn")}</Title>
					<CardType>
						{t("supplier-lbl")}: {item.cardType.name}
					</CardType>
					<CardNumber>
						{t("card-number-lbl")}:{" "}
						{`XXXX-XXXX-XXXX-${item.number.substr(item.number.length - 4)}`}
					</CardNumber>
					<OwnerName>
						{t("name-lbl")}: {item.ownerName}
					</OwnerName>
					<ExpirationDate>
						{t("due-date-lbl")}: {moment(item.dateTo).format("MM-YYYY")}
					</ExpirationDate>
					<Buttons>
						<EditButton type="link" onClick={() => setEditMode(true)}>
							{t("to-update-btn")}
						</EditButton>
						<Popconfirm
							title={t("are-you-sure-you-want-to-remove-subtitle")}
							onConfirm={confirm}
							okText={t("yes-btn")}
							cancelText={t("no-btn")}
						>
							<EditButton type="link" danger>
								{t("remove-btn")}
							</EditButton>
						</Popconfirm>
					</Buttons>
				</>
			)}
		</Inner>
	);
}

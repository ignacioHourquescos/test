import { Popconfirm } from "antd";
import React, { useState } from "react";
import { update_payments } from "../../../../../../../../../api/finance/finance-endpoints";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import EditPaymentCash from "../../edit/cash/EditPaymentCash";
import { Buttons, Currency, EditButton, Inner, Title } from "./styles";

export default function PaymentCashItem({
	code,
	item,
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
				payments.cashData.values.length > 1
					? {
							values: payments.cashData.values
								.filter((i) => item.currencyCode !== i.currencyCode)
								.map((el) => {
									return {
										currencyCode: el.currencyCode,
									};
								}),
					  }
					: null,
			creditCardData:
				payments.creditCardData.values.length > 0
					? {
							values: payments.creditCardData.values.map((el) => {
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
				<EditPaymentCash
					item={item}
					code={code}
					payments={payments}
					onEdit={onEdit}
					onCancel={() => setEditMode(false)}
				/>
			) : (
				<>
					<Title>{t("cash-btn")}</Title>
					<Currency>
						{t("currency-lbl")}: {item.currencyName}
					</Currency>
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

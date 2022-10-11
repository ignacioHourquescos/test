import React from "react";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import { Title, Currency, Inner } from "./styles";

export default function PaymentCashItem({ item }) {
	const { t } = useTranslation();
	return (
		<Inner>
			<Title>{t("cash-btn")}</Title>
			<Currency>{item.currencyName}</Currency>
		</Inner>
	);
}

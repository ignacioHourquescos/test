import React from "react";
import PaymentDebitItem from "../read/bank-debit/PaymentDebitItem";
import PaymentCashItem from "../read/cash/PaymentCashItem";
import PaymentCreditCardItem from "../read/credit-card/PaymentCreditItem";
import { Inner } from "./styles";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

const Results = ({ bankPayments, creditCardPayments, cashPayments }) => {
	const { t } = useTranslation();
	if (!bankPayments || !creditCardPayments || !cashPayments)
		return <div>Loading...</div>;
	if (
		bankPayments.length === 0 &&
		creditCardPayments.length === 0 &&
		cashPayments.length === 0
	)
		return <div>{t("no-information-available-lbl")}</div>;

	return (
		<Inner>
			{bankPayments.map((item, idx) => (
				<PaymentDebitItem item={item} key={`debit_${idx}`} />
			))}
			{creditCardPayments.map((item, idx) => (
				<PaymentCreditCardItem item={item} key={`creadit_card_${idx}`} />
			))}
			{cashPayments.map((item, idx) => (
				<PaymentCashItem item={item} key={`cash_${idx}`} />
			))}
		</Inner>
	);
};

export default Results;

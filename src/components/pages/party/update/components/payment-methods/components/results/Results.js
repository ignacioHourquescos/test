import React from "react";
import PaymentDebitItem from "../read/bank-debit/PaymentDebitItem";
import PaymentCashItem from "../read/cash/PaymentCashItem";
import PaymentCreditCardItem from "../read/credit-card/PaymentCreditItem";
import { Inner } from "./styles";
import { SkeletonComponent } from "./components/skeleton-component/SkeletonComponent";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

const Results = ({ payments, code, onDelete, onEdit }) => {
  const { t } = useTranslation();

  if (!payments) return <SkeletonComponent />;
  if (
    payments.bankAccountData.values.length === 0 &&
    payments.creditCardData.values.length === 0 &&
    payments.cashData.values.length === 0
  )
    return <div>{t("no-information-available-lbl")}</div>;

  return (
    <Inner>
      {payments.creditCardData.values.map((item, idx) => (
        <PaymentCreditCardItem
          key={`creadit_card_${idx}`}
          item={item}
          idx={idx}
          code={code}
          onDelete={onDelete}
          payments={payments}
          onEdit={onEdit}
        />
      ))}
      {payments.bankAccountData.values.map((item, idx) => (
        <PaymentDebitItem
          key={`debit_${idx}`}
          item={item}
          idx={idx}
          code={code}
          onDelete={onDelete}
          payments={payments}
          onEdit={onEdit}
        />
      ))}
      {payments.cashData.values.map((item, idx) => (
        <PaymentCashItem
          key={`cash_${idx}`}
          item={item}
          code={code}
          onDelete={onDelete}
          payments={payments}
          onEdit={onEdit}
        />
      ))}
    </Inner>
  );
};

export default Results;

import React from "react";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import {
  Title,
  Bank,
  BankAccount,
  BankAccountType,
  BankBranch,
  Currency,
  Inner,
} from "./styles";

export default function PaymentDebitItem({ item }) {
  const { t } = useTranslation();

  return (
    <Inner>
      <Title>{t("Debito en cuenta")}</Title>
      <Bank>
        {item.bankBranch.bank.name}, {item.bankBranch.name},
      </Bank>
      <BankAccount>
        {" "}
        {item.bankAccountType.name} : {item.number}, {item.currency.name} (
        {item.currency.symbol})
      </BankAccount>
    </Inner>
  );
}

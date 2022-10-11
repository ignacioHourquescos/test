import React from "react";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import {
  Title,
  CardNumber,
  CardType,
  ExpirationDate,
  Inner,
  OwnerName,
  AditionalInformation,
} from "./styles";

export default function PaymentCreditCardItem({ item }) {
  const { t } = useTranslation();

  return (
    <Inner>
      <Title>{t("credit-debit-card-btn")}</Title>
      <CardType>
        {item.cardType.name} :{" "}
        {`XXXX-XXXX-XXXX-${item.number.substr(item.number.length - 4)}`}
      </CardType>
      <AditionalInformation>
        {item.ownerName} / {item.dateTo}
      </AditionalInformation>
    </Inner>
  );
}

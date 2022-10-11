import React from "react";
import Card from "../../../../../common/card/Card";
import { Link } from "react-router-dom";
import Results from "./components/results/Results";
import { useTranslation } from "../../../../../../contexts/translationContext";
import { useActions } from "../../../../../../contexts/actionsContext";
import SkeletonComponent from "./components/skeleton-component/SkeletonComponent";

export default function PaymentInformation({ info }) {
  const { t } = useTranslation();
  const { hasAction } = useActions();

  if (!info) return <SkeletonComponent />;

  return (
    <Card>
      <Card.TitleContainer>
        <Card.Title>{t("payment-methods-title")}</Card.Title>
        {((info.personType === "INDIVIDUAL" &&
          hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_UPDATE")) ||
          (info.personType === "ORGANISATION" &&
            hasAction("PARTY_SEARCH_MENU.ORGANISATION_UPDATE"))) && (
          <Card.Link>
            <Link to={`/party/people/${info.code}/${info.personType}/payment`}>
              {t("to-update-btn")}
            </Link>
          </Card.Link>
        )}
      </Card.TitleContainer>
      <Card.Content>
        {info?.bankAccountData?.values.length > 0 ||
        info?.creditCardData?.values.length > 0 ||
        info?.cashData?.values.length > 0 ? (
          <Results
            bankPayments={info.bankAccountData.values}
            creditCardPayments={info.creditCardData.values}
            cashPayments={info.cashData.values}
          />
        ) : (
          <Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
        )}
      </Card.Content>
    </Card>
  );
}

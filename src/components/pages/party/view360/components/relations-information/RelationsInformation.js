import React from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "../../../../../../contexts/translationContext";
import { useActions } from "../../../../../../contexts/actionsContext";
import SkeletonComponent from "./components/skeleton-component/SkeletonComponent";
import Card from "../../../../../common/card/Card";

export default function RelationsInformation({ info }) {
  const { t } = useTranslation();
  const { hasAction } = useActions();

  if (!info) return <SkeletonComponent />;

  const renderContent = () => {
    return (
      <>
        {info?.individuals?.map((element, idx) => (
          <Tag key={`person_${idx}`}>
            {`${element.firstName} ${element.lastName} (${element.relationType.name})`}
          </Tag>
        ))}
        {info?.organisations?.map((element, idx) => (
          <Tag key={`organization_${idx}`}>
            {`${element.name} (${element.relationType.name})`}
          </Tag>
        ))}
      </>
    );
  };

  return (
    <Card>
      <Card.TitleContainer>
        <Card.Title>{t("relations-view-title")}</Card.Title>

        {((info.personType === "INDIVIDUAL" &&
          hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_UPDATE")) ||
          (info.personType === "ORGANISATION" &&
            hasAction("PARTY_SEARCH_MENU.ORGANISATION_UPDATE"))) && (
          <Card.Link>
            <Link
              to={`/party/people/${info.code}/${info.personType}/relations`}
            >
              {t("to-update-btn")}
            </Link>
          </Card.Link>
        )}
      </Card.TitleContainer>
      <Card.Content>
        {info?.individuals?.length > 0 || info?.organisations?.length > 0 ? (
          renderContent()
        ) : (
          <Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
        )}
      </Card.Content>
    </Card>
  );
}

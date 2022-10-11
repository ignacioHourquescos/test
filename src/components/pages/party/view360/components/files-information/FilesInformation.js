import React from "react";
import Card from "../../../../../common/card/Card";
import { List } from "antd";
import { useTranslation } from "../../../../../../contexts/translationContext";
import { useActions } from "../../../../../../contexts/actionsContext";
import { Link } from "react-router-dom";
import SkeletonComponent from "./components/skeleton-component/SkeletonComponent";

export default function FilesInformation({ info }) {
  const { t } = useTranslation();
  const { hasAction } = useActions();

  if (!info) return <SkeletonComponent />;

  return (
    <Card>
      <Card.TitleContainer>
        <Card.Title>{t("records-title")}</Card.Title>
        {((info.personType === "INDIVIDUAL" &&
          hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_UPDATE")) ||
          (info.personType === "ORGANISATION" &&
            hasAction("PARTY_SEARCH_MENU.ORGANISATION_UPDATE"))) && (
          <Card.Link>
            <Link to={`/party/people/${info.code}/${info.personType}/files`}>
              {t("to-update-btn")}
            </Link>
          </Card.Link>
        )}
      </Card.TitleContainer>
      <Card.Content>
        {info && info.values && info.values.length > 0 ? (
          <List
            size="small"
            bordered={false}
            dataSource={info.values}
            renderItem={(item) => <List.Item>{item.name}</List.Item>}
          />
        ) : (
          <Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
        )}
      </Card.Content>
    </Card>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../../../../../contexts/translationContext";
import { useActions } from "../../../../../../contexts/actionsContext";
import SkeletonComponent from "./components/skeleton-component/SkeletonComponent";
import Card from "../../../../../common/card/Card";
import parse from "html-react-parser";

export default function NotesInformation({ info }) {
  const { t } = useTranslation();
  const { hasAction } = useActions();

  if (!info) return <SkeletonComponent />;

  return (
    <Card>
      <Card.TitleContainer>
        <Card.Title>{t("note-title")}</Card.Title>
        {((info.personType === "INDIVIDUAL" &&
          hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_UPDATE")) ||
          (info.personType === "ORGANISATION" &&
            hasAction("PARTY_SEARCH_MENU.ORGANISATION_UPDATE"))) && (
          <Card.Link>
            <Link to={`/party/people/${info.code}/${info.personType}/notes`}>
              {t("to-update-btn")}
            </Link>
          </Card.Link>
        )}
      </Card.TitleContainer>

      {info && info.values && info.values.length > 0 ? (
        info.values.map((element, idx) => (
          <Card.Content key={`note_${idx}`}>
            <Card.SubTitle>{element.title}</Card.SubTitle>
            <Card.DataPointValue>{parse(element.content)}</Card.DataPointValue>
          </Card.Content>
        ))
      ) : (
        <Card.Content>
          <Card.NoInfo>{t("no-information-available-lbl")}</Card.NoInfo>
        </Card.Content>
      )}
    </Card>
  );
}

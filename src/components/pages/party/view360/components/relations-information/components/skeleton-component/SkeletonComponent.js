import { Skeleton } from "antd";
import React from "react";
import Card from "../../../../../../../common/card/Card";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

export default function SkeletonComponent() {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.TitleContainer>
        <Card.Title>{t("relations-view-title")}</Card.Title>
      </Card.TitleContainer>
      <Card.Content>
        <Skeleton
          active
          size="small"
          paragraph={{
            rows: 0,
          }}
        />
      </Card.Content>
    </Card>
  );
}

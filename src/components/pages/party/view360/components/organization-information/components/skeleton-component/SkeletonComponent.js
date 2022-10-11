import { Skeleton } from "antd";
import React from "react";
import Card from "../../../../../../../common/card/Card";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

export default function SkeletonComponent() {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.TitleContainer>
        <Card.Title>{t("organization-data-subtitle")}</Card.Title>
      </Card.TitleContainer>
      <Card.Content>
        <Skeleton
          active
          size="small"
          paragraph={{
            rows: 1,
          }}
        />
        <Skeleton
          active
          size="small"
          paragraph={{
            rows: 2,
          }}
        />
        <Skeleton
          active
          size="small"
          paragraph={{
            rows: 2,
          }}
        />
        <Skeleton
          active
          size="small"
          paragraph={{
            rows: 2,
          }}
        />
      </Card.Content>
    </Card>
  );
}

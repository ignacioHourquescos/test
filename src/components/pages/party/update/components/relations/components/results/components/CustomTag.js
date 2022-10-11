import React from "react";
import { Popconfirm } from "antd";
import { Inner, Close, Content } from "./styles";
import { CloseCircleOutlined } from "@ant-design/icons";
import COLORS from "../../../../../../../../common/theme/colors";

import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import FloatingLabel from "../../../../../../../../common/floatingLabel/FloatingLabel";

export default function CustomTag({ children, onDelete }) {
  const { t } = useTranslation();
  return (
    <Inner>
      <Content>{children}</Content>
      <Close>
        <FloatingLabel hint={t("remove-hint")}>
          <Popconfirm
            title={t("are-you-sure-you-want-to-remove-subtitle")}
            onConfirm={onDelete}
            okText={t("yes-btn")}
            cancelText={t("no-btn")}
          >
            <CloseCircleOutlined
              style={{
                marginLeft: "10px",
                color: COLORS.RED,
              }}
            />
          </Popconfirm>
        </FloatingLabel>
      </Close>
    </Inner>
  );
}

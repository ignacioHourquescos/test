import moment from "moment";
import React from "react";
import { Content, Date, EditButton, Inner, Title } from "./styles";
import { Col, Row, Popconfirm } from "antd";
import {
  get_notes,
  update_notes,
} from "../../../../../../../../../../api/people/general";
import { useTranslation } from "../../../../../../../../../../contexts/translationContext";
import parse from "html-react-parser";

export default function ReadNote({
  note,
  notes,
  code,
  index,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation();
  const handleDelete = async () => {
    await update_notes(
      code,
      notes?.length > 1
        ? {
            values: [
              ...notes
                .filter((el, idx) => idx !== index)
                .map((el) => {
                  return {
                    title: el.title,
                    content: el.content,
                  };
                }),
            ],
          }
        : { values: null }
    );

    const result = await get_notes(code);

    if (!result) {
      onDelete();
    }

    onDelete(result);
  };

  return (
    <Inner>
      <Title>{note.title}</Title>
      <Date>{moment(note.activeDate).format("DD-MM-YYYY")}</Date>
      <Content>{parse(note.content)}</Content>
      <Row gutter={4}>
        <Col>
          <EditButton type="link" onClick={onEdit}>
            {t("to-update-btn")}
          </EditButton>
        </Col>
        <Col>
          <Popconfirm
            title={t("are-you-sure-you-want-to-remove-subtitle")}
            onConfirm={handleDelete}
            okText={t("yes-btn")}
            cancelText={t("no-btn")}
          >
            <EditButton danger type="text">
              {t("remove-btn")}
            </EditButton>
          </Popconfirm>
        </Col>
      </Row>
    </Inner>
  );
}

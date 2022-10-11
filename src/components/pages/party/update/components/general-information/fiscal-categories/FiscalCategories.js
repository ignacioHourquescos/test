import React, { useState, useEffect } from "react";
import { Col, Form, Row, Select } from "antd";
import DataContainer from "../../data-container/DataContainer";
import FloatingLabel from "../../../../../../common/floatingLabel/FloatingLabel";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import { get_fiscal_categories } from "../../../../../../../api/people/general";

const { Option } = Select;

const GUTTER = 7;

export default function FiscalCategories({ personType, form }) {
  const { t } = useTranslation();
  const [fiscalCategories, setFiscalCategories] = useState([]);

  const residenceCountryCode = Form.useWatch("residenceCountryCode", form);
  const fiscalCategory = Form.useWatch("fiscalCategory", form);

  useEffect(() => {
    const fetch_fiscal_categories = async () => {
      const data = await get_fiscal_categories(
        personType,
        residenceCountryCode
      );
      setFiscalCategories(data.values || []);
    };

    if (residenceCountryCode) {
      fetch_fiscal_categories();
    }
  }, [residenceCountryCode]);

  return (
    <DataContainer>
      <DataContainer.Section>{t("tax-data-title")}</DataContainer.Section>
      <DataContainer.Content>
        <Row gutter={GUTTER}>
          <Col span={16}>
            <FloatingLabel
              label={t("tax-category-lbl")}
              value={fiscalCategory}
              hint={t("tax-category-hint")}
            >
              <Form.Item name="fiscalCategory">
                <Select allowClear={true}>
                  {fiscalCategories.map((fiscalCategory) => (
                    <Option
                      key={fiscalCategory.code}
                      value={fiscalCategory.code}
                    >
                      {fiscalCategory.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </FloatingLabel>
          </Col>
        </Row>
      </DataContainer.Content>
    </DataContainer>
  );
}

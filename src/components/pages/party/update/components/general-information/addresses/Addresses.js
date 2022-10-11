import React, { useState, useEffect } from "react";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DataContainer from "../../data-container/DataContainer";
import { useTranslation } from "../../../../../../../contexts/translationContext";
import { get_address_types } from "../../../../../../../api/location/location-endpoints";
import Address from "./Address";

const SECTION_NAME = "addresses";

export default function Addresses({ form }) {
  const { t } = useTranslation();
  const [addressesTypes, setAddressesTypes] = useState([]);

  const addresses = Form.useWatch(SECTION_NAME, form);

  useEffect(() => {
    const fetch_address_types = async () => {
      const data = await get_address_types();
      setAddressesTypes(data.values || []);
    };

    fetch_address_types();
  }, []);

  return (
    <DataContainer>
      <DataContainer.Section>{t("home-title")}</DataContainer.Section>
      <DataContainer.Content>
        <Form.List name={SECTION_NAME}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Address
                  key={key}
                  form={form}
                  name={name}
                  addresses={addresses}
                  addressesTypes={addressesTypes}
                  remove={remove}
                  {...restField}
                />
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  {t("add-btn")}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </DataContainer.Content>
    </DataContainer>
  );
}

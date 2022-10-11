import React from "react";
import { Inner, Result, Title } from "./styles";
import { Checkbox } from "antd";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

export default function SearchResultsPerson({ title, results, onSelect }) {
  const { t } = useTranslation();

  return (
    <Inner>
      {!results && <Title>{t("no-search-criteria-lbl")}</Title>}
      {results && results.length > 0 && (
        <React.Fragment>
          <Title>{title}</Title>
          {results.map((item, idx) => (
            <Checkbox key={`item_${idx}`} onChange={() => onSelect(item)}>
              <Result key={item.key} onClick={() => onSelect(item)}>
                {`${item.firstName} ${item.lastName}, ${item.identificationTypeCode}: ${item.identificationNumber}`}
              </Result>
            </Checkbox>
          ))}
        </React.Fragment>
      )}
    </Inner>
  );
}

import DataLayout from "../data-layout/DataLayout";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Results from "./components/results/Results";
import PaymentTypeSelector from "./components/payment-type-selector/PaymentTypeSelector";
import CreatePaymentCredit from "./components/create/credit-card/CreatePaymentCredit";
import CreatePaymentDebit from "./components/create/bank-debit/CreatePaymentDebit";
import CreatePaymentCash from "./components/create/cash/CreatePaymentCash";
import { get_payment_methods_by_party_code } from "../../../../../../api/finance/finance-endpoints";
import { useTranslation } from "../../../../../../contexts/translationContext";

export default function PaymentMethods({ code }) {
  const { t } = useTranslation();
  const [payments, setPayments] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);

  const fetch_payment_methods = async () => {
    const data = await get_payment_methods_by_party_code(code);
    setPayments({
      bankAccountData: {
        values: data?.bankAccountData?.values || [],
      },
      creditCardData: {
        values: data?.creditCardData?.values || [],
      },
      cashData: {
        values: data?.cashData?.values || [],
      },
    });
  };

  useEffect(() => {
    fetch_payment_methods();
  }, []);

  const handlePaymentTypeSelect = (type) => {
    setSelectedPaymentType(type);
  };

  const onCreate = () => {
    fetch_payment_methods();
  };

  const onDelete = () => {
    fetch_payment_methods();
  };

  const onEdit = () => {
    fetch_payment_methods();
  };

  return (
    <DataLayout>
      <DataLayout.Left>
        <DataLayout.Title>{t("add-payment-method-subtitle")}</DataLayout.Title>
        <PaymentTypeSelector onSelect={handlePaymentTypeSelect} />
        {!selectedPaymentType && (
          <Button type="primary" disabled style={{ marginTop: "20px" }}>
            {t("add-btn")}
          </Button>
        )}
        {selectedPaymentType === "CREDIT" && (
          <CreatePaymentCredit
            code={code}
            payments={payments}
            onCreate={onCreate}
          />
        )}
        {selectedPaymentType === "DEBIT" && (
          <CreatePaymentDebit
            code={code}
            payments={payments}
            onCreate={onCreate}
          />
        )}
        {selectedPaymentType === "CASH" && (
          <CreatePaymentCash
            code={code}
            payments={payments}
            onCreate={onCreate}
          />
        )}
      </DataLayout.Left>
      <DataLayout.Right>
        <DataLayout.Title>
          {t("charged-payment-methods-title")}
        </DataLayout.Title>
        <Results
          payments={payments}
          code={code}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </DataLayout.Right>
    </DataLayout>
  );
}

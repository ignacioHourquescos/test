import { Popconfirm } from "antd";
import React, { useState } from "react";
import { update_payments } from "../../../../../../../../../api/finance/finance-endpoints";
import { useTranslation } from "../../../../../../../../../contexts/translationContext";
import EditPaymentDebit from "../../edit/bank-debit/EditPaymentDebit";
import {
  Bank,
  BankAccount,
  BankAccountType,
  BankBranch,
  Buttons,
  Cbu,
  Currency,
  EditButton,
  Inner,
  Title,
} from "./styles";

export default function PaymentDebitItem({
  code,
  item,
  idx,
  onDelete,
  payments,
  onEdit,
}) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  const confirm = async (e) => {
    const post_data = {
      bankAccountData:
        payments.bankAccountData.values.length > 1
          ? {
              values: payments.bankAccountData.values
                .filter((i, index) => idx !== index)
                .map((el) => {
                  return {
                    number: el.number,
                    cbu: el.cbu,
                    currencyCode: el.currency.code,
                    bankBranchCode: el.bankBranch.code,
                    bankAccountTypeCode: el.bankAccountType.code,
                  };
                }),
            }
          : null,
      cashData:
        payments.cashData.values.length > 0
          ? {
              values: payments.cashData.values.map((el) => {
                return {
                  currencyCode: el.currencyCode,
                };
              }),
            }
          : null,
      creditCardData:
        payments.creditCardData.values.length > 0
          ? {
              values: payments.creditCardData.values.map((el) => {
                return {
                  ownerName: el.ownerName,
                  number: el.number,
                  securityCode: el.securityCode,
                  dateFrom: el.dateFrom,
                  dateTo: el.dateTo,
                  typeCode: el.cardType.code,
                };
              }),
            }
          : null,
    };

    await update_payments(code, post_data);

    onDelete();
  };

  return (
    <Inner>
      {editMode ? (
        <EditPaymentDebit
          item={item}
          idx={idx}
          code={code}
          payments={payments}
          onEdit={onEdit}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <Title>{t("account-debit-btn")}</Title>
          <Bank>
            {t("bank-lbl")}: {item.bankBranch.bank.name}
          </Bank>
          <BankBranch>
            {t("branch-office-lbl")}: {item.bankBranch.name}
          </BankBranch>
          <BankAccountType>
            {t("account-type-lbl")}: {item.bankAccountType.name}
          </BankAccountType>
          <BankAccount>
            {t("account-number-lnl")}: {item.number}
          </BankAccount>
          <Cbu>
            {t("cbu-lbl")}: {item.cbu}
          </Cbu>
          <Currency>
            {t("currency-lbl")}:{item.currency.name} ({item.currency.symbol})
          </Currency>
          <Buttons>
            <EditButton type="link" onClick={() => setEditMode(true)}>
              {t("to-update-btn")}
            </EditButton>
            <Popconfirm
              title={t("are-you-sure-you-want-to-remove-subtitle")}
              onConfirm={confirm}
              okText={t("yes-btn")}
              cancelText={t("no-btn")}
            >
              <EditButton type="link" danger>
                {t("remove-btn")}
              </EditButton>
            </Popconfirm>
          </Buttons>
        </>
      )}
    </Inner>
  );
}

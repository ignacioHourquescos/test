import React, { useState, useEffect } from "react";
import { Select } from "antd";
import FloatingLabel from "../../../../../../../common/floatingLabel/FloatingLabel";
import { Inner } from "./styles";
import { useTranslation } from "../../../../../../../../contexts/translationContext";

const { Option } = Select;

export default function PaymentTypeSelector({ onSelect }) {
  const { t } = useTranslation();
  const [paymentType, setPaymentType] = useState(null);

  const paymentTypes = [
    {
      code: "CREDIT",
      name: t("credit-debit-card-btn"),
    },
    {
      code: "DEBIT",
      name: t("account-debit-btn"),
    },
    {
      code: "CASH",
      name: t("cash-btn"),
    },
  ];

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };

	useEffect(() => {
		onSelect(paymentType);
	}, [paymentType]);

	return (
		<Inner>
			<FloatingLabel
				label={t("type-payment-methods-lbl")}
				hint={t("type-payment-methods-hint")}
				value={paymentType}
			>
				<Select
					allowClear={true}
					style={{ width: "100%" }}
					onChange={handlePaymentTypeChange}
				>
					{paymentTypes.map((type) => (
						<Option key={type.code} value={type.code}>
							{type.name}
						</Option>
					))}
				</Select>
			</FloatingLabel>
		</Inner>
	);
}

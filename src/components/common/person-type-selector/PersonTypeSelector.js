import React, { useState } from "react";
import { useTranslation } from "../../../contexts/translationContext";
import { IconButton, Inner } from "./styles";
import { IoBusinessOutline, IoPersonOutline } from "react-icons/io5";
import { Radio } from "antd";
import { useActions } from "../../../contexts/actionsContext";
// import "antd/lib/radio/style/index.css";

export default function PersonTypeSelector({ value, onChange, actions }) {
	const { t } = useTranslation();
	const { hasAction } = useActions();

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<Inner>
			<Radio.Group
				value={value}
				buttonStyle="solid"
				optionType="button"
				onChange={handleChange}
			>
				{hasAction(actions[0]) && (
					<Radio.Button value="INDIVIDUAL" className="truncate">
						<IconButton>
							&nbsp;
							<IoPersonOutline />
							&nbsp;
						</IconButton>
					</Radio.Button>
				)}

				{hasAction(actions[1]) && (
					<Radio.Button value="ORGANISATION" className="truncate">
						<IconButton>
							&nbsp;
							<IoBusinessOutline />
							&nbsp;
						</IconButton>
					</Radio.Button>
				)}
			</Radio.Group>
		</Inner>
	);
}

import { Tooltip } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Inner, Label } from "./styles";

export default function FloatingLabel({
	label,
	value,
	children,
	hint,
	...restProps
}) {
	const ref = useRef();
	const [onFocus, setOnFocus] = useState(false);

	useEffect(() => {
		const onBodyClick = (event) => {
			if (ref.current.contains(event.target)) return;
			setOnFocus(false);
		};

		document.body.addEventListener("click", onBodyClick, { capture: true });

		return () => {
			document.body.removeEventListener("click", onBodyClick, {
				capture: true,
			});
		};
	}, []);

	return (
		<Inner
			ref={ref}
			onFocus={() => setOnFocus(true)}
			onBlur={() => setOnFocus(false)}
			{...restProps}
		>
			<Tooltip title={hint} placement="left" zIndex={999}>
				{children}

				<Label
					hasFocus={value || onFocus}
					//saco para evitar el movimiento: Pedido "GRL- FLoating Label que se mueve"
					//hasFocus={true}
				>
					{label}
				</Label>
			</Tooltip>
		</Inner>
	);
}

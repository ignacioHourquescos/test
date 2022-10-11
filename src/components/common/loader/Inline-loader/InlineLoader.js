import React from "react";
import { Dot, LoadingWrapper, Inner } from "./styles";

export default function InlineLoader() {
	return (
		<Inner>
			<LoadingWrapper>
				<Dot delay="0s" />
				<Dot delay="0.1s" />
				<Dot delay="0.2s" />
			</LoadingWrapper>
		</Inner>
	);
}

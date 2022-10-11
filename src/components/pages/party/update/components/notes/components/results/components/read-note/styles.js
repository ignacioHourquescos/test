import { Button } from "antd";
import styled from "styled-components";
import COLORS from "../../../../../../../../../common/theme/colors";
import TYPO from "../../../../../../../../../common/theme/typo";

export const Inner = styled.div`
	margin-bottom: 1rem;
`;
export const Title = styled.div`
	font-weight: bold;
`;
export const Date = styled(TYPO.H6)`
	color: ${COLORS.BODY};
	font-size: 0.7rem;
`;

export const Content = styled(TYPO.H6)`
	margin-bottom: 0rem;
`;

export const EditButton = styled(Button)`
	display: flex !important;
	align-items: center;
	${"" /* gap: 10px; */}
	padding: 0 !important;
	margin: 0 !important;
	margin-bottom: 1rem;
`;

export const EliminateButton = styled(Button)`
	display: flex !important;
	align-items: center;
	${"" /* gap: 10px; */}
	padding: 0 !important;
	margin: 0 !important;
	margin-bottom: 1rem;
`;

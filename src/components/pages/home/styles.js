import styled from "styled-components";
import COLORS from "../../common/theme/colors";
import TYPO from "../../common/theme/typo";

export const Inner = styled.div`
	display: flex;
	padding: 0px;
	height: 100%;
`;

export const Sections = styled.div`
	flex: 4 0%;
	padding: 48px 50px;
`;

export const Glossaries = styled.div`
	flex: 6 0%;
	background-color: ${COLORS.BACK};
	padding: 120px 50px;
`;

export const Introductory = styled(TYPO.H3)`
	padding-top: 10px;
	color: ${COLORS.SECONDARY};
	font-weight: 200;
`;

import styled from "styled-components";
import COLORS from "../../../common/theme/colors";

export const Inner = styled.div`
	display: flex;
	padding: 0px;
	height: 100%;
`;

export const Controls = styled.div`
	flex: 2.5 0%;
	padding: 25px 50px;
`;

export const Results = styled.div`
	flex: 7.5 0%;
	padding: 75px 50px 0 50px;
	background-color: ${COLORS.BACK};
`;

import styled from "styled-components";
import COLORS from "../theme/colors";
import TYPO from "../theme/typo";

export const ToggleButton = styled.div`
	display: flex;
	align-items: flex-start;
	margin-bottom: 10px;
	font-size: 20px;
	margin-bottom: 20px;
	cursor: pointer;
	padding-rigth: 0.5rem;
`;
export const Icon = styled.img`
	border-radius: 0.5rem;
	cursor: pointer;
`;
export const Inner = styled.div`
	position: fixed;
	z-index: 100;
	right: 0;
	top: 0;
	background-color: ##eaeaeb;
	height: 60px;
	${({ collapsed }) =>
		collapsed
			? `width:60px;background-color:#EAEAEB;display:flex;justify-content:center;padding:20px 0;`
			: `width:450px;background-color: #EAEAEB;padding: 20px;height: 100vh;`}
`;
export const Sections = styled.div``;
export const Section = styled.div`
	margin-bottom: 15px;
`;
export const SectionLinks = styled.div`
	margin-top: 5px;
	padding-left: 25px;
`;
export const SectionTitle = styled(TYPO.H2)`
	margin-bottom: 10px;
	padding-left: 5px;
`;
export const SubSection = styled.div`
	margin-top: 5px;
	padding-left: 10px;
`;
export const SubSectionTitle = styled.div`
	font-size: 16px;
	font-weight: 500;
	padding-left: 10px;
`;
export const Action = styled.div`
	font-size: 14px;
	font-weight: 500;
	${({ active }) => (active ? `color:${COLORS.PRIMARY};` : ``)}
	padding-left:15px;
`;

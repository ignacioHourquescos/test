import styled from "styled-components";
import COLORS from "../../../../common/theme/colors";
import TYPO from "../../../../common/theme/typo";

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Section = styled.div`
	margin-bottom: 20px;
`;

export const SectionTitle = styled.div``;

export const Item = styled(TYPO.H3)`
	color: ${COLORS.SECONDARY};
`;

export const ItemsSection = styled(TYPO.H3)`
	color: ${COLORS.SECONDARY};
	padding: 5px 20px;
  font-weight:bold;
`;

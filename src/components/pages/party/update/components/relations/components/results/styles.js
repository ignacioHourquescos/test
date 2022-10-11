import styled from "styled-components";
import COLORS from "../../../../../../../common/theme/colors";
import TYPO from "../../../../../../../common/theme/typo";

export const Inner = styled.div``;

export const Tag = styled.span`
  border-bottom: 1px solid ${COLORS.BACK};
  border: 1px solid black;
  border-radius: 50px;
  display: inline-block;
  padding: 0.25rem 1rem;
  position: relative;
  margin-right: 1rem;
`;

export const Content = styled(TYPO.H4)`
  margin-right: 1rem;
  display: inline-block;
`;

export const Section = styled.div``;
export const SectionTitle = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: ${COLORS.SECONDARY};
  font-weight: bold;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
export const TagName = styled.div``;
export const TagType = styled.div``;

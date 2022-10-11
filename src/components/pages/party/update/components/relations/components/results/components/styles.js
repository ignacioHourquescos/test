import styled from "styled-components";
import COLORS from "../../../../../../../../common/theme/colors";
import TYPO from "../../../../../../../../common/theme/typo";

export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-style: solid;
  border-width: 2px;
  border-color: ${COLORS.LIGHTGREY};
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
`;

export const DeleteTag = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

export const Content = styled.div`
  display: flex;
`;

export const Close = styled.div``;

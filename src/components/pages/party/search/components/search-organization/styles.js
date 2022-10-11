import { Button } from "antd";
import styled from "styled-components";
import COLORS from "../../../../../common/theme/colors";

export const Inner = styled.div`
  padding-bottom: 2rem;
`;

export const AdvancedSearch = styled.div`
  margin: 25px 0 25px 0;
`;

export const AdvancedSearchButton = styled(Button)`
  display: flex !important;
  align-items: center;
  gap: 10px;
  padding: 0 !important;
  margin: 0 !important;
`;

export const WarningMessage = styled.div`
  margin-bottom: 20px;

  ${({ error }) => (error ? `color:${COLORS.ALT3}` : `color:${COLORS.BODY}`)}
`;

export const Message = styled.div`
  margin-bottom: 20px;
`;

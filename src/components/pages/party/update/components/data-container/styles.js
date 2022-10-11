import styled from "styled-components";
import COLORS from "../../../../../common/theme/colors";
import TYPO from "../../../../../common/theme/typo";

export const Inner = styled.div`
  margin-bottom: 30px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: 30px;
  display: flex;
`;

export const DataSection = styled.div`
  flex: 1;
  color: ${COLORS.SECONDARY};
`;

export const DataContent = styled.div`
  flex: 5;
  padding-left: 20px;
`;

export const AddRow = styled(TYPO.H5)`
  flex: 1;
  color: ${COLORS.ANTDBLUE};
`;


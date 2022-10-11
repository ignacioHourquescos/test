import styled from "styled-components";
import COLORS from "../theme/colors";
import TYPO from "../theme/typo";

export const Inner = styled.div`
  margin-bottom: 30px;
  border-radius: 5px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: 30px;
`;

export const Card = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.1);
`;

export const CardTitleContainer = styled.div`
  background-color: rgba(196, 196, 196, 0.1);
  width: 100%;
  padding: 9px 27px;
  display: flex;
  justify-content: space-between;
`;

export const CardTitle = styled(TYPO.H2)`
  color: ${COLORS.SECONDARY};
`;

export const CardLink = styled(TYPO.H3)`
  color: ${COLORS.ANTDBLUE};
  font-weight: normal;
`;

export const CardContent = styled.div`
  padding: 9px 27px;
  width: 100%;
  padding-bottom: 18px;
  & .ant-list-item {
    padding: 0 !important;
  }
`;

export const CardSubTitle = styled(TYPO.H3)`
  color: ${COLORS.BODY};
  margin-bottom: 2px;
  margin-top: 8px;
`;

export const CardDataPoint = styled.div`
  color: ${COLORS.BODY};
`;

export const CardDataPointLabel = styled(TYPO.H5)`
  color: ${COLORS.BODY};
  margin: 0;
  font-weight: 500;
  display: inline;
`;

export const CardDataPointValue = styled(TYPO.H6)`
  color: ${COLORS.BODY};
  opacity: 0.8;
  display: inline;
`;

export const NoInfo = styled.div`
  color: ${COLORS.BODY};
  font-size: 10px;
`;

export const Skeleton = styled.div``;

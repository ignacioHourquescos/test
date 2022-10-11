import styled from "styled-components";
import TYPO from "../../../../common/theme/typo/index";
import COLORS from "../../../../common/theme/colors/index";

export const Detail = styled.div`
  color: ${COLORS.SECONDARY};
`;

export const Title = styled(TYPO.H2)``;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 1.3rem;
  font-size: 30px;
`;

export const Inner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
  height: 100px;
  padding-right: 40px;

  :hover {
    background-color: ${COLORS.BACK};
  }

  ${({ active }) =>
    active
      ? `border:2px solid ${COLORS.PRIMARY};`
      : `border:2px solid ${COLORS.SECONDARY}`}

  ${Detail} {
    ${({ active }) =>
      active ? `color:${COLORS.PRIMARY}` : `color:${COLORS.SECONDARY}`}
  }

  ${Icon} {
    ${({ active }) =>
      active ? `color:${COLORS.PRIMARY}` : `color:${COLORS.SECONDARY}`}
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 30px;
`;

export const Description = styled(TYPO.H5)`
  font-weight: 400;
`;

export const IconArrow = styled.img`
  position: absolute;
  right: -37px;
`;

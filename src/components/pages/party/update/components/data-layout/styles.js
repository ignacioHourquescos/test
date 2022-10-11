import styled from "styled-components";
import COLORS from "../../../../../common/theme/colors";
import TYPO from "../../../../../common/theme/typo";

export const Inner = styled.div`
  margin-bottom: 30px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  ${'' /* margin-right: 30px; */}
  display: flex;
  height:100%;
  transform: translateY(-16px);
  ${'' /* padding-top:16px; */}
`;

export const Left = styled.div`
  flex: 3;
  color: ${COLORS.SECONDARY};
  padding-right:40px;
  padding-top:40px;
  
`;

export const Right = styled.div`
  flex: 4;
  padding: 40px;
  min-height:100vh;
  height:100%;
  background-color: ${COLORS.BACK};



`;

export const AddButton = styled.div`
  width:40px;
  height:40px;
  border-radius
  color: ${COLORS.ANTDBLUE};
`;


export const Title = styled(TYPO.H3)`
  color: ${COLORS.SECONDARY};
  margin-bottom:20px;
`;

// export const Inner = styled.div`
//   display: flex;
//   padding: 0px;
//   height: 100%;
// `;

// export const Controls = styled.div`
//   flex: 4 0%;
//   padding: 25px 50px;
// `;

// export const Results = styled.div`
//   flex: 6 0%;
//   padding: 120px 50px 0 50px;
//   background-color: ${COLORS.BACK};
 
// `;

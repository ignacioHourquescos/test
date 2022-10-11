import styled, { keyframes } from "styled-components";
import COLORS from "../../theme/colors";

export const Inner = styled.div`
	display: flex;
`;

export const LoadingWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
`;

const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 0.5rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;

export const Dot = styled.div`
	background-color: ${COLORS.PRIMARY};
	border-radius: 50%;
	width: 0.5rem;
	height: 0.5rem;
	margin: 0 0.25rem;
	/*Animation*/
	animation: ${BounceAnimation} 0.5s ease-in-out infinite;
	animation-delay: ${(props) => props.delay};
`;

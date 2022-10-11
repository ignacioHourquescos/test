import styled, { keyframes } from "styled-components";
import COLORS from "../../theme/colors";
export const Loader = styled.div``;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	justify-items: center;
	align-items: center;
	height: 80vh;
	width: 100%;

	background-color: ${COLORS.BACK70};
	position: relative;
	top: 0;
`;

// .content p {
//   font-size: 18px;
//   font-weight: 500;
//   color: #444;
// }

export const Logo = styled.div`
	animation: ${myAnim3} 4s ease 1s infinite normal forwards;
	position: absolute;

	z-index: 1;
`;
const myAnim = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  5% {
    opacity: 1;
    transform: translateX(-5px) translateY(5px);
  }
  50% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const myAnim3 = keyframes`
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(-360deg) scale(1.5);
  }
  75% {
    transform: scale(2.7);
  }
  100% {
    transform: scale(1);
  }
`;

const myAnim2 = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  5% {
    opacity: 1;
    transform: translateX(5px) translateY(-6px);
  }
  50% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Left = styled.div`
	animation: ${myAnim} 4s ease 5s infinite normal forwards;
`;

export const Right = styled.div`
	position: absolute;
	top: 9px;
	animation: ${myAnim2} 4s ease 5s infinite normal forwards;
`;

export const StyledSpinner = styled.svg`
	animation: rotate 1s linear infinite;
	margin: 40px;
	width: 100px;
	height: 100px;
	position: absolute;
	& .path {
		stroke: white;
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;

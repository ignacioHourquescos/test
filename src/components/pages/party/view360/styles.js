import styled, { keyframes } from "styled-components";

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0px;
	height: 100%;
	padding: 25px 50px;
	flex: 1 1 0%;
`;

export const FirstColumn = styled.div`
	flex: 1 1 0%;
`;

export const SecondColumn = styled.div`
	flex: 1 1 0%;
`;

export const CardContainer = styled.div`
	display: flex;
	margin-top: 31px;
`;

export const Loading = styled.div``;

export const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const CardSkeleton = styled.div`
	display: inline-block;
	height: ${(props) => props.height || "100%"};
	width: ${(props) => props.width || "100%"};
	animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
	background-color: #eee;
	background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
	background-size: 200px 100%;
	background-repeat: no-repeat;
	border-radius: 4px;
	margin-bottom: 8px;
	margin-top: ${(props) => props.marginTop || "0"};
	height: 80vh;
`;

export const SkeletonContainer = styled.div`
	flex: 1 1 0%;
	height: 80vh;
	border: 1px solid grey;
`;

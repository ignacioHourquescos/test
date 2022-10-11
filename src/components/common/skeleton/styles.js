import styled from "styled-components";
import { Button, Skeleton } from "antd";

export const Inner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Title = styled.div``;

export const EmptyResults = styled.div``;

export const Actions = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

export const Action = styled(Button)`
	display: flex !important;
	align-items: center;
	gap: 10px;
	padding: 0 !important;
	margin: 0 !important;
`;

export const SkeletonTable = styled(Skeleton)``;

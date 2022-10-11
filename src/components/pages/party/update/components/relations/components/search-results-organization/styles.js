import styled from "styled-components";
import { Button } from "antd";

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.div`
  margin-bottom: 5px;
`;

export const Action = styled(Button)`
  display: flex !important;
  align-items: center;
  gap: 10px;
  padding: 0 !important;
  margin: 0 !important;
`;

export const EmptyResults = styled.div``;

export const Result = styled.div`
  cursor: pointer;
`;

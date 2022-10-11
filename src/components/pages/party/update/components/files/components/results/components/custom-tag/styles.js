import styled from "styled-components";

export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgba(156, 163, 175, var(--tw-border-opacity));
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  margin-bottom: 20px;
`;
export const IconHover = styled.div`
  & .anticon > svg:hover {
    color: #1890ff !important;
  }
`;
export const DeleteTag = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ff3333;
`;
export const Content = styled.div`
  flex: 1 1 0%;
`;
export const Title = styled.div``;
export const Close = styled.div``;
export const Tags = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Tag = styled.div`
  font-size: 10px;
`;

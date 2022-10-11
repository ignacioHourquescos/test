import styled from "styled-components";
import { Button } from "antd";
import COLORS from "../../../../../../../common/theme/colors";

export const Inner = styled.div`
  margin-top: 1rem;s
  width: 100%;
`;

export const UploadButton = styled.div`
  height: 200px;
  margin-bottom: 50px;

  & {
    .ant-upload-text-icon {
      display: flex !important;
      align-items: center !important;
    }
  }
`;

export const FileInfo = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: ${COLORS.BACK};
`;
export const FileName = styled.div``;
export const Meta = styled.div``;
export const Error = styled.div`
  color: #ff3333;
  font-size: 12px;
`;
export const RemoveFileBtn = styled(Button)`
  padding: 0 !important;
  margin: 0 !important;
  --tw-text-opacity: 1 !important;
  color: rgba(239, 68, 68, var(--tw-text-opacity)) !important;
`;

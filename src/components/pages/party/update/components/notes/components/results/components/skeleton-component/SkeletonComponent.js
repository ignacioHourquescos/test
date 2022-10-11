import { Skeleton } from "antd";
import React from "react";

export const SkeletonComponent = () => {
  return (
    <Skeleton
      active
      size="small"
      paragraph={{
        rows: 1,
      }}
    />
  );
};

import React from "react";
import { Skeleton } from "antd";

export default function SkeletonTitle() {
  return (
    <Skeleton
      active
      size="default"
      paragraph={{
        rows: 0,
      }}
    />
  );
}

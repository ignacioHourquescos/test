import { Skeleton } from "antd";
import React from "react";
import { Inner } from "./styles";

export default function SkeletonComponent() {
  return (
    <Inner>
      <Skeleton
        active
        size="default"
        paragraph={{
          rows: 9,
        }}
      />
    </Inner>
  );
}

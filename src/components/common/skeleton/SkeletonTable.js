import React from "react";
import { Skeleton } from "antd";
import { Inner } from "./styles";

export default function SkeletonTable({ lines, type }) {
  const numberOfLines = Array.apply(null, Array(lines)).map(function (x, i) {
    return i;
  });

  return (
    <Inner>
      {type == "table" ? (
        <>
          <Skeleton.Input
            style={{ width: "100%", marginTop: "15px" }}
            active={true}
            size="default"
          />
          {numberOfLines.map((e, idx) => (
            <Skeleton.Input
              key={`line_${idx}`}
              style={{ width: "100%", marginTop: "15px" }}
              active={true}
              size="small"
            />
          ))}
        </>
      ) : type == "parragraph" ? (
        <>
          <Inner style={{ padding: "2%" }}>
            <Skeleton.Input
              style={{ width: "70%", marginTop: "15px" }}
              active={true}
              size="small"
            />
            {numberOfLines.map((e, idx) => (
              <Skeleton.Input
                key={`line_${idx}`}
                style={{ width: "100%", marginTop: "15px" }}
                size="small"
              />
            ))}
          </Inner>
        </>
      ) : (
        <Skeleton.Input
          style={{ width: "50%", marginTop: "15px" }}
          active={true}
          size="small"
        />
      )}
    </Inner>
  );
}

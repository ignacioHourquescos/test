import React from "react";
import { Inner, DataContent, DataSection, AddRow } from "./styles";

const DataContainer = ({ children, ...restProps }) => (
  <Inner {...restProps}>{children}</Inner>
);

export default DataContainer;

DataContainer.Section = ({ children, ...restProps }) => {
  return <DataSection {...restProps}>{children}</DataSection>;
};

DataContainer.Content = ({ children, ...restProps }) => {
  return <DataContent {...restProps}>{children}</DataContent>;
};

DataContainer.AddRow = ({ children, ...restProps }) => {
  return <AddRow {...restProps}>{children}</AddRow>;
};

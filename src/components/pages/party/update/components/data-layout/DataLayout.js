import React from "react";
import { Inner, Left, Right, AddButton, Title } from "./styles";

const DataLayout = ({ children, ...restProps }) => (
	<Inner {...restProps}>{children}</Inner>
);

export default DataLayout;

DataLayout.Left = ({ children, ...restProps }) => {
	return <Left {...restProps}>{children}</Left>;
};

DataLayout.Right = ({ children, ...restProps }) => {
	return <Right {...restProps}>{children}</Right>;
};

DataLayout.AddButton = ({ children, ...restProps }) => {
	return <AddButton {...restProps}>{children}</AddButton>;
};

DataLayout.Title = ({ children, ...restProps }) => {
	return <Title {...restProps}>{children}</Title>;
};

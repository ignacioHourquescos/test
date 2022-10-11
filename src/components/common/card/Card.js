import React from "react";
import {
  Inner,
  CardTitleContainer,
  CardTitle,
  CardLink,
  CardSubTitle,
  CardDataPoint,
  CardDataPointLabel,
  CardDataPointValue,
  CardContent,
  NoInfo,
} from "./styles";

const Card = ({ children, ...restProps }) => (
  <Inner {...restProps}>{children}</Inner>
);

export default Card;

Card.TitleContainer = ({ children, ...restProps }) => {
  return <CardTitleContainer {...restProps}>{children}</CardTitleContainer>;
};

Card.Title = ({ children, ...restProps }) => {
  return <CardTitle {...restProps}>{children}</CardTitle>;
};

Card.Link = ({ children, ...restProps }) => {
  return <CardLink {...restProps}>{children}</CardLink>;
};

Card.Content = ({ children, ...restProps }) => {
  return <CardContent {...restProps}>{children}</CardContent>;
};

Card.SubTitle = ({ children, ...restProps }) => {
  return <CardSubTitle {...restProps}>{children}</CardSubTitle>;
};

Card.DataPoint = ({ children, ...restProps }) => {
  return <CardDataPoint {...restProps}>{children}</CardDataPoint>;
};

Card.DataPointLabel = ({ children, ...restProps }) => {
  return <CardDataPointLabel {...restProps}>{children}</CardDataPointLabel>;
};

Card.DataPointValue = ({ children, ...restProps }) => {
  return <CardDataPointValue {...restProps}>{children}</CardDataPointValue>;
};

Card.NoInfo = ({ children, ...restProps }) => {
  return <NoInfo {...restProps}>{children}</NoInfo>;
};

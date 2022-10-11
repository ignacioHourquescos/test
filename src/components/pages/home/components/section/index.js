import React from "react";
import {
  Container,
  Inner,
  Title,
  Description,
  Icon,
  Detail,
  IconArrow,
} from "./styles";

import Files_CTAbutton from "../../../../../../public/assets/images/Files_CTAbutton.svg";

const Section = ({ children, ...restProps }) => (
  <Inner {...restProps}>{children}</Inner>
);

export default Section;

Section.Container = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Section.Title = ({ children, ...restProps }) => {
  return <Title {...restProps}>{children}</Title>;
};

Section.Description = ({ children, ...restProps }) => {
  return <Description {...restProps}>{children}</Description>;
};

Section.Icon = ({ children, ...restProps }) => {
  return <Icon {...restProps}>{children}</Icon>;
};

Section.Detail = ({ children, ...restProps }) => {
  return <Detail {...restProps}>{children}</Detail>;
};

Section.IconArrow = ({ ...restProps }) => {
  return <IconArrow {...restProps} src={Files_CTAbutton} />;
};

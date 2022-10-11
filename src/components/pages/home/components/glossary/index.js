import React from "react";
import { ItemsSection, Inner, Section, SectionTitle, Item } from "./styles";

const Glossary = ({ children, ...restProps }) => (
  <Inner {...restProps}>{children}</Inner>
);

export default Glossary;

Glossary.Section = ({ children, ...restProps }) => {
  return <Section {...restProps}>{children}</Section>;
};

Glossary.SectionTitle = ({ children, ...restProps }) => {
  return <SectionTitle {...restProps}>{children}</SectionTitle>;
};

Glossary.ItemsSection = ({ children, ...restProps }) => {
  return <ItemsSection {...restProps}>{children}</ItemsSection>;
};

Glossary.Item = ({ children, ...restProps }) => {
  return <Item {...restProps}>{children}</Item>;
};

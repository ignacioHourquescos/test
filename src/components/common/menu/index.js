import React, { useState, useContext, createContext } from "react";
import {
	Inner,
	ToggleButton,
	Sections,
	Section,
	SectionTitle,
	SubSection,
	SubSectionTitle,
	SectionLinks,
	Action,
	Icon,
} from "./styles";
import arrowRight from "../../../../public/assets/images/arrowRight.svg";
import arrowLeft from "../../../../public/assets/images/arrowLeft.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const MenuContext = createContext();

const Menu = ({ children, ...restProps }) => {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<MenuContext.Provider value={{ collapsed, setCollapsed }}>
			<Inner collapsed={collapsed} {...restProps}>
				{children}
			</Inner>
		</MenuContext.Provider>
	);
};

export default Menu;

Menu.ToggleButton = ({ ...restProps }) => {
	const { collapsed, setCollapsed } = useContext(MenuContext);

	return (
		<ToggleButton onClick={() => setCollapsed((prev) => !prev)} {...restProps}>
			{collapsed ? <FaChevronLeft /> : <FaChevronRight />}
		</ToggleButton>
	);
};

Menu.Sections = ({ children, ...restProps }) => {
	const { collapsed } = useContext(MenuContext);
	return <Sections {...restProps}>{!collapsed && children}</Sections>;
};

Menu.Section = ({ children, ...restProps }) => {
	return <Section {...restProps}>{children}</Section>;
};

Menu.SectionTitle = ({ children, ...restProps }) => {
	return <SectionTitle {...restProps}>{children}</SectionTitle>;
};

Menu.SubSection = ({ children, ...restProps }) => {
	return <SubSection {...restProps}>{children}</SubSection>;
};

Menu.SubSectionTitle = ({ children, ...restProps }) => {
	return <SubSectionTitle {...restProps}>{children}</SubSectionTitle>;
};

Menu.SectionLinks = ({ children, ...restProps }) => {
	return <SectionLinks {...restProps}>{children}</SectionLinks>;
};

Menu.SubSectionTitle = ({ children, ...restProps }) => {
	return <SubSectionTitle {...restProps}>{children}</SubSectionTitle>;
};

Menu.Action = ({ children, ...restProps }) => {
	return <Action {...restProps}>{children}</Action>;
};

Menu.Icon = ({ children, ...restProps }) => {
	return <Icon {...restProps}>{children}</Icon>;
};

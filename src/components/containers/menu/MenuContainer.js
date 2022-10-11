import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Menu from "../../common/menu";
import arrowRight from "../../../../public/assets/images/arrowRight.svg";
import { useMenu } from "../../../contexts/menuContext";
import { useTranslation } from "../../../contexts/translationContext";
import { useActions } from "../../../contexts/actionsContext";

const Section = ({ section }) => {
	const { t } = useTranslation();
	const { hasAction } = useActions();

	return (
		<Menu.Section>
			<Menu.SectionTitle>{t(section.labelCode)}</Menu.SectionTitle>
			{section.menus ? (
				section.menus.map((subsection) => (
					<SubSection key={subsection.code} section={subsection} />
				))
			) : (
				<Action action={section} />
			)}
		</Menu.Section>
	);
};

const SubSection = ({ section }) => {
	const { t } = useTranslation();

	return (
		<Menu.SubSection>
			{section.menus ? (
				<>
					<Menu.SubSectionTitle>{t(section.labelCode)}</Menu.SubSectionTitle>
					{section.menus.map((subsection) => (
						<SubSection key={subsection.code} section={subsection} />
					))}
				</>
			) : (
				<Action action={section} />
			)}
		</Menu.SubSection>
	);
};

const SectionLinks = ({ link }) => {
	const { t } = useTranslation();

	return (
		<Menu.SectionLinks>
			<Link to={link.pathname}>
				&rarr;&nbsp;&nbsp;&nbsp;&nbsp;{t(link.pathname)}
			</Link>
		</Menu.SectionLinks>
	);
};

const Action = ({ action }) => {
	const { cleanPath } = useMenu();
	const { t } = useTranslation();
	const history = useHistory();

	return (
		<Menu.Action active={history.location.pathname === action.path}>
			<Link to={cleanPath(action.path)}>
				&rarr;&nbsp;&nbsp;&nbsp;&nbsp;{t(action.labelCode)}
			</Link>
		</Menu.Action>
	);
};

export default () => {
	const { menu } = useMenu();
	const { t } = useTranslation();
	const [topHistory, setTopHistory] = useState([]);
	useEffect(() => {
		var history = localStorage.getItem("user_history")
			? JSON.parse(localStorage.getItem("user_history"))
			: [];
		const top = history
			.filter((a) => a.pathname && a.pathname !== "/")
			.sort((a, b) => b.counter - a.counter)
			.slice(0, 5);
		setTopHistory(top);
	}, []);

	return (
		<Menu>
			<Menu.ToggleButton>
				<Menu.Icon src={arrowRight} alt="Toggle Menu" />
			</Menu.ToggleButton>
			<Menu.Sections>
				{menu.menus.map((section) => (
					<Section key={section.code} section={section} />
				))}
			</Menu.Sections>
			<Menu.Sections>
				{topHistory && topHistory.length > 0 ? (
					<>
						<Menu.SubSectionTitle>
							{t("# Rutas mas frecuentes")}
						</Menu.SubSectionTitle>
						{topHistory.map((link, index) => {
							return <SectionLinks key={index} link={link} />;
						})}
					</>
				) : null}
			</Menu.Sections>
		</Menu>
	);
};

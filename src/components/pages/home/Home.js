import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../common/layout";
import Glossary from "./components/glossary";
import Section from "./components/section";
import { Glossaries, Inner, Sections, Introductory } from "./styles";
import { useTranslation } from "../../../contexts/translationContext";
import { useMenu } from "../../../contexts/menuContext";
import RouteIcon from "../../common/route-icon/RouteIcon";
import { useActions } from "../../../contexts/actionsContext";

export default () => {
  const { t } = useTranslation();
  const { hasAction } = useActions();
  const { menu, cleanPath } = useMenu();
  const [selectedSection, setSelectedSection] = useState(null);

  const renderLink = (menu) => {
    switch (menu.code) {
      case "PARTY_SEARCH_MENU":
        return hasAction("PARTY_SEARCH_MENU.INDIVIDUAL_SEARCH") ||
          hasAction("PARTY_SEARCH_MENU.ORGANISATION_SEARCH") ? (
          <Link to={() => cleanPath(menu.path)}>
            &rarr;&nbsp;&nbsp;&nbsp;&nbsp;{t(menu.labelCode)}
          </Link>
        ) : null;
      case "PARTY_CREATE_MENU":
        return hasAction("PARTY_CREATE_MENU.INDIVIDUAL_CREATE") ||
          hasAction("PARTY_CREATE_MENU.ORGANISATION_CREATE") ? (
          <Link to={() => cleanPath(menu.path)}>
            &rarr;&nbsp;&nbsp;&nbsp;&nbsp;{t(menu.labelCode)}
          </Link>
        ) : null;
      default:
        return (
          <Link to={() => cleanPath(menu.path)}>
            &rarr;&nbsp;&nbsp;&nbsp;&nbsp;{t(menu.labelCode)}
          </Link>
        );
    }
  };

  return (
    <Layout>
      <Layout.Main>
        <Inner>
          <Sections>
            <Layout.Header>
              <Layout.Title>{t(menu.labelCode)}</Layout.Title>
            </Layout.Header>
            <Section.Container>
              {menu.menus.map((menu) => (
                <Section
                  key={`menu_${menu.code}`}
                  onClick={() => setSelectedSection(menu)}
                  active={selectedSection === menu}
                >
                  <Section.Icon>
                    <RouteIcon code={menu.code} alt={t(menu.labelCode)} />
                  </Section.Icon>
                  <Section.Detail>
                    <Section.Title>{t(menu.labelCode)}</Section.Title>
                    <Section.Description>
                      {t(menu.labelCode)}
                    </Section.Description>
                  </Section.Detail>
                  <Section.IconArrow />
                </Section>
              ))}
            </Section.Container>
          </Sections>
          <Glossaries>
            <Glossary>
              {!selectedSection ? (
                <Introductory>{t("party-module-lbl")}</Introductory>
              ) : null}
              {selectedSection &&
                selectedSection.menus.map((menu) =>
                  menu.menus ? (
                    <Glossary.Section key={`section_${menu.code}`}>
                      <Glossary.SectionTitle>
                        {t(menu.labelCode)}
                      </Glossary.SectionTitle>
                      <Glossary.ItemsSection>
                        {menu.menus.map((item) => (
                          <Glossary.Item key={`item_${item.code}`}>
                            <Link to={item.path}>
                              &rarr;{t(item.labelCode)}
                            </Link>
                          </Glossary.Item>
                        ))}
                      </Glossary.ItemsSection>
                    </Glossary.Section>
                  ) : (
                    <Glossary.Item key={`item_${menu.code}`}>
                      {renderLink(menu)}
                    </Glossary.Item>
                  )
                )}
            </Glossary>
          </Glossaries>
        </Inner>
      </Layout.Main>
    </Layout>
  );
};

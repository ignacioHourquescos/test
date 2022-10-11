import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../../contexts/translationContext";
import Layout from "../../common/layout";
import MenuContainer from "../../containers/menu/MenuContainer";
import { Inner } from "./styles";

export default ({ title, parents }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Layout.Main>
        <Inner>
          <Layout.Header>
            <Layout.Title>{t(title)}</Layout.Title>
            <Layout.Breadcrumb>
              {parents &&
                parents.map((p, idx) => (
                  <React.Fragment key={`bc_${idx}`}>
                    <Layout.BreadcrumbItem>
                      {p.path ? (
                        <Link to={p.path}>{t(p.labelCode)}</Link>
                      ) : (
                        t(p.labelCode)
                      )}
                    </Layout.BreadcrumbItem>
                    {idx + 1 < parents.length && <Layout.BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
            </Layout.Breadcrumb>
          </Layout.Header>
          <div className="flex flex-col gap-4 w-full h-96 justify-center items-center">
            <div>Contenido de ETAPA 2 - PARTY MODULE</div>
            <div className="text-sm text-gray-400">En desarrollo</div>
          </div>
        </Inner>
      </Layout.Main>
      <Layout.Aside>
        <MenuContainer />
      </Layout.Aside>
    </Layout>
  );
};

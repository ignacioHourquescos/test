import React from "react";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/es_ES";
import "./index.css";
import "antd/dist/antd.css";
import { TranslationProvider } from "./contexts/translationContext";
import { MenuProvider } from "./contexts/menuContext";
import axiosInstance from "./api/axiosInstance";
import { ActionsProvider } from "./contexts/actionsContext";
import Main from "./components/Main";

export default ({ history, menu }) => {
  const token = localStorage.getItem("auth_token");
  const roles = localStorage.getItem("auth_roles");
  const tenant = localStorage.getItem("auth_tenant");

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-Tenant"] = tenant;
      config.params = {
        ...config.params,
        // roles,
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <TranslationProvider initialData={menu.labels}>
      <ConfigProvider locale={locale}>
      <MenuProvider initialData={menu}>
        <ActionsProvider initialData={menu}>
          <Main history={history} />
        </ActionsProvider>
      </MenuProvider>
      </ConfigProvider>
    </TranslationProvider>
  );
};

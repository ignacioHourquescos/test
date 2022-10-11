import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";
import startup from "./utils/startup.json";

const mount = (
  el,
  { onSignIn, onNavigate, defaultHistory, initialPath, menu }
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App onSignIn={onSignIn} history={history} menu={menu} />,
    el
  );

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  localStorage.setItem("auth_tenant", "sysone");
  const devRoot = document.getElementById("_files-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory(), menu: startup });
  }
}

export { mount };

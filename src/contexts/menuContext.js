import React, { createContext, useContext, useState, useEffect } from "react";

const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}

const defaultPaths = {
  PARTY_MODULE: "/party",
  PARTY_SEARCH_MENU: "/party/people/search",
  PARTY_CREATE_MENU: "/party/people/create/:personTypeParam?",
};

const r = [];

export function MenuProvider({ initialData, children }) {
  const [menu, setMenu] = useState(initialData);
  const [routes, setRoutes] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!menu) setRoutes(null);
    const rs = iterate([menu]);
    setRoutes(rs);
    setReady(true);
  }, []);

  const getDefaultPath = (code) => {
    return defaultPaths[code];
  };

  const iterate = (menus, parents = []) => {
    menus.map((m) => {
      if (!m.path) {
        m.path = getDefaultPath(m.code);
      }
      if (m.path) r.push({ m, parents });
      if (m.menus)
        iterate(m.menus, [
          ...parents,
          { code: m.code, labelCode: m.labelCode, path: m.path },
        ]);
    });

    return r;
  };

  const cleanPath = (path) => {
    return path.split("/:")[0];
  };

  return (
    <MenuContext.Provider
      value={{ menu, routes, getDefaultPath, cleanPath, ready }}
    >
      {children}
    </MenuContext.Provider>
  );
}

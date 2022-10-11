import React, { createContext, useContext, useState, useEffect } from "react";

const ActionsContext = createContext();

export function useActions() {
  return useContext(ActionsContext);
}

export function ActionsProvider({ initialData, children }) {
  const [actions, setActions] = useState([]);
  const [ready, setReady] = useState(false);

  let actns = [];
  const extractActions = (menus) => {
    menus.map((m) => {
      if (m.actions) {
        actns = [
          ...actns,
          ...m.actions.map((a) => {
            return {
              code: a.code,
              name: a.name,
              path: a.path,
              menuCode: m.code,
            };
          }),
        ];
      }
      if (m.menus) extractActions(m.menus);
    });

    return actns;
  };

  useEffect(() => {
    extractActions(initialData.menus);
    setActions(actns);
    setReady(true);
  }, []);

  const hasAction = (key) => {
    const menuCode = key.split(".")[0];
    const actionCode = key.split(".")[1];
    return actions.some(
      (el) => el.menuCode === menuCode && el.code === actionCode
    );
  };

  return (
    <ActionsContext.Provider value={{ actions, hasAction, ready }}>
      {children}
    </ActionsContext.Provider>
  );
}

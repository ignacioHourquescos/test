import React, { createContext, useContext, useState } from "react";

const TranslationContext = createContext();

export function useTranslation() {
  return useContext(TranslationContext);
}

export function TranslationProvider({ initialData, children }) {
  const [translations, setTranslationes] = useState(initialData);

  const t = (key, ...args) => {
    if (!translations) return key;
    let translation =
      translations.find(
        (el) => el.code.toLowerCase().trim() === key.toLowerCase().trim()
      )?.content || key;
    args.forEach(
      (a, index) => (translation = translation.replace(`#${index}#`, a))
    );
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ translations, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

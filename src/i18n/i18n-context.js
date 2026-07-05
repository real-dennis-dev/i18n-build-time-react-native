import React, { createContext, useState, useEffect, useContext } from "react";
import TranslationLoader from "./build/translation-loader";
import { defaultLocale, locales } from "./locales";

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(TranslationLoader.getLocale());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial locale from device settings or stored preference
    const storedLocale = localStorage?.getItem("app_locale");
    if (storedLocale && locales[storedLocale]) {
      TranslationLoader.setLocale(storedLocale);
      setLocale(storedLocale);
    } else {
      TranslationLoader.setLocale(defaultLocale);
      setLocale(defaultLocale);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const listener = (newLocale) => {
      setLocale(newLocale);
    };

    TranslationLoader.addListener(listener);
    return () => TranslationLoader.removeListener(listener);
  }, []);

  const changeLocale = (newLocale) => {
    if (locales[newLocale]) {
      TranslationLoader.setLocale(newLocale);
      setLocale(newLocale);
      // Store preference
      localStorage?.setItem("app_locale", newLocale);
    }
  };

  const getTranslation = (namespace, key, params = {}) => {
    return TranslationLoader.get(namespace, key, params);
  };

  const getNested = (path, params = {}) => {
    return TranslationLoader.getNested(path, params);
  };

  const value = {
    locale,
    locales,
    changeLocale,
    getTranslation,
    getNested,
    isLoading,
    t: getNested, // Shorthand
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

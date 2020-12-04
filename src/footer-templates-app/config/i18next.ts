/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import i18n, { Module } from "i18next";
import { initReactI18next } from "react-i18next";

import enLocale from "./locales/en.json";
import plLocale from "./locales/pl.json";

export enum Languages {
  English = "en",
  Polish = "pl"
}

export const resources: Record<
  Languages,
  { translation: Record<string, unknown> }
> = {
  [Languages.English]: {
    translation: enLocale
  },
  [Languages.Polish]: {
    translation: plLocale
  }
};

const defaultLanguage = Languages.English;

void i18n.use(initReactI18next as Module).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false
  },
  debug:
    process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test"
});

export const availableLocales = Object.keys(i18n.options.resources || {});

export const languageLocalStorageKey = "language";

export { i18n };

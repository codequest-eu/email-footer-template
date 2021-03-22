import {
  availableLocales,
  i18n,
  languageLocalStorageKey
} from "footer-templates-app/config/i18next";

export function isLocaleAvailable(language: string) {
  return availableLocales.includes(language);
}

export function getInitialLanguage() {
  if (global.localStorage) {
    const storedLanguage = localStorage.getItem(languageLocalStorageKey);

    if (storedLanguage) {
      return storedLanguage;
    }
  }

  const browserLanguage = window.navigator.language.split("-")[0];

  if (isLocaleAvailable(browserLanguage)) {
    return browserLanguage;
  }

  return i18n.language;
}

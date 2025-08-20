import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const ar_home = require("../public/locales/ar/common.json");
const en_home = require("../public/locales/en/common.json");

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "htmlTag", "cookie", "path"],
      caches: ["localStorage"],
    },
    resources: {
      ar: {
        common: ar_home,
      },
      en: {
        common: en_home,
      },
    },
  });

export default i18n;

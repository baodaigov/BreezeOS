import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import i18n_enUS from "../locales/en-US.json";
import i18n_vi from "../locales/vi.json";
import i18n_zhCN from "../locales/zh-CN.json";
import i18n_zhTW from "../locales/zh-TW.json";
import i18n_ko from "../locales/ko.json";
import i18n_ru from "../locales/ru.json";
import i18n_uk from "../locales/uk.json";
import i18n_ja from "../locales/ja.json";
import i18n_th from "../locales/th.json";
import i18n_de from "../locales/de.json";
import i18n_es from "../locales/es.json";
import i18n_in from "../locales/in.json";
import i18n_it from "../locales/it.json";
import i18n_fr from "../locales/fr.json";

const resources = {
  "English (US)": {
    translation: i18n_enUS,
  },
  "Tiếng Việt": {
    translation: i18n_vi,
  },
  "中文 (简体)": {
    translation: i18n_zhCN,
  },
  "中文 (繁體)": {
    translation: i18n_zhTW,
  },
  한국어: {
    translation: i18n_ko,
  },
  Русский: {
    translation: i18n_ru,
  },
  Український: {
    translation: i18n_uk,
  },
  日本語: {
    translation: i18n_ja,
  },
  แบบไทย: {
    translation: i18n_th,
  },
  Deutsch: {
    translation: i18n_de,
  },
  Español: {
    translation: i18n_es,
  },
  "Bahasa Indonesia": {
    translation: i18n_in,
  },
  Italiano: {
    translation: i18n_it,
  },
  Français: {
    translation: i18n_fr,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "English (US)",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

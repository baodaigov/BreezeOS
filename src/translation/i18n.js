import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import i18n_enUS from "../locales/en-US/i18n.json";
import i18n_vi from "../locales/vi/i18n.json";

const resources = {
  enUS: {
    translation: i18n_enUS,
  },
  vi: {
    translation: i18n_vi,
  },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "enUS",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

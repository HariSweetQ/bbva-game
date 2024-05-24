import i18next from "i18next";
import { initLitI18n } from "lit-i18n";
import esTranslation from "../locales/es.json";
import enTranslation from "../locales/en.json";

const resources = {
  es: {
    translation: esTranslation,
  },  
  en: {
    translation: enTranslation,
  }
};

i18next.use(initLitI18n).init({  
  lng: "es",
  resources
});

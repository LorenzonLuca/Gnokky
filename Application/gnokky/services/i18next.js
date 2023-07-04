import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../locales/en.json';
import it from '../locales/it.json';
import de from '../locales/de.json'; 
import fr from '../locales/fr.json'; 
import es from '../locales/es.json'; 

export const languageResources = {
    en: {translation: en},
    it: {translation: it},
    de: {translation: de},
    fr: {translation: fr},
    es: {translation: es},
};

i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    resources: languageResources,
});

export default i18next;
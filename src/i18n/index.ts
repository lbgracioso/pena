import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import ptBrTranslations from './locales/pt-BR';
import enUsTranslations from './locales/en-US';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            'pt-BR': ptBrTranslations,
            'en-US': enUsTranslations,
        },
        lng: 'pt-BR',
        fallbackLng: 'pt-BR',
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false,
        },
    });

console.log(i18n);

export default i18n;

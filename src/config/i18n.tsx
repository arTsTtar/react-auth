import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const enResource = require('../locales/en/translation.json');
const itResource = require('../locales/lt/translation.json');
const resources = Object.assign(enResource, itResource);

i18n
    .use(initReactI18next)
    .init({
    resources,
    fallbackLng: "en",

    keySeparator: false,
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
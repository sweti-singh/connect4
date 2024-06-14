import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import En from './language/En.json'
import Hi from './language/Hi.json'

i18n.use(initReactI18next).init({
    lng:'en',
    resources:{
        en:{
            translation:En
        },
        hi:{
            translation:Hi
        }
    },
    fallbackLng:'en',
    interpolation: {
        escapeValue: false, // React already does escaping
      },
    keySeparator:"."
})

export default i18n;
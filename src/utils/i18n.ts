import i18next from 'i18next';
import { initLitI18n } from 'lit-i18n';

import enTranslation from '../locales/en.json';
import esTranslation from '../locales/es.json';

const resources = {
	es: {
		translation: esTranslation,
	},
	en: {
		translation: enTranslation,
	},
};

i18next.use(initLitI18n).init({
	lng: 'es',
	resources,
});

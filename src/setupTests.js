// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { toHaveNoViolations } from 'jest-axe';
import { initReactI18next } from 'react-i18next';
import translations from './translations';

expect.extend(toHaveNoViolations);

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'fi',
    fallbackLng: 'cimode',
    supportedLngs: ['fi', 'en', 'sv']
  });



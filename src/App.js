import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations';
import './App.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import lataamoReducer from './redux/reducers';
import Lataamo from './Lataamo';
import { DEFAULT_LANGUAGE } from './Constants';
import { listenForBreakpointChanges } from './components/utilities/visibilities';
import NotificationProvider from './components/notification/NotificationContext';

const store = createStore(lataamoReducer, applyMiddleware(thunk));

const defaultLanguage = () => {
  try {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      document.documentElement.lang = savedLanguage;
      return savedLanguage;
    }
  } catch (error) {
    console.error(error.message);
  }
  document.documentElement.lang = DEFAULT_LANGUAGE;
  return DEFAULT_LANGUAGE;
};

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: defaultLanguage(),
    fallbackLng: 'cimode',
    supportedLngs: ['fi', 'en', 'sv']
  });

listenForBreakpointChanges();

const App = () => {

  return (
    <Provider store={store}>
      <NotificationProvider>
        <Lataamo />
      </NotificationProvider>
    </Provider>
  );
};

App.propTypes = {
};

export default App;
